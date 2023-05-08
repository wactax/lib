use anyhow::Result;
use napi::{
  bindgen_prelude::{AsyncTask, Buffer},
  Env, JsNumber, Task,
};
use ordered_varint::Variable;

#[macro_use]
extern crate napi_derive;

const COOKIE_SAFE_CHAR: &str =
  "!#$%&'()*+-./0123456789:<>?@ABDEFGHIJKLMNQRSTUVXYZ[]^_`abdefghijklmnqrstuvxyz{|}~";

#[napi]
pub fn cookie_decode(s: String) -> Result<Buffer> {
  dbg!(&s);
  Ok(base_x::decode(COOKIE_SAFE_CHAR, &s)?.into())
}

#[napi]
pub fn cookie_encode(li: Buffer) -> String {
  let li = li.to_vec();
  dbg!(base_x::encode(COOKIE_SAFE_CHAR, &li), &li);
  base_x::encode(COOKIE_SAFE_CHAR, &li)
}

#[napi]
pub fn random_bytes(n: u32) -> Buffer {
  (0..n)
    .map(|_| rand::random::<u8>())
    .collect::<Vec<u8>>()
    .into()
}

#[napi]
pub fn z85_dump(bin: Buffer) -> Buffer {
  z85::encode(bin).into()
}

#[napi]
pub fn z85_load(bin: Buffer) -> Result<Buffer> {
  Ok(z85::decode(bin)?.into())
}

#[napi]
pub fn u64_bin(n: JsNumber) -> Result<Buffer> {
  let n: i64 = n.try_into()?;
  let n = n as u64;
  Ok(n.to_variable_vec()?.into())
}

#[napi]
pub fn bin_u64(n: Buffer) -> Result<i64> {
  let n = u64::decode_variable(&*n)? as i64;
  Ok(n)
}

#[napi]
pub fn zip_u64(li: Vec<JsNumber>) -> Result<Buffer> {
  let mut u64_li = vec![];
  for i in li {
    let i: i64 = i.try_into()?;
    u64_li.push(i as u64);
  }
  Ok(vbyte::compress_list(&u64_li).into())
}

#[napi]
pub fn unzip_u64(bin: Buffer) -> Vec<i64> {
  match vbyte::decompress_list(&bin) {
    Ok(r) => r.into_iter().map(|i| i as i64).collect(),
    Err(_) => vec![],
  }
}

pub fn _password_hash(buf: &Buffer) -> Buffer {
  const N: usize = 512;
  let mut hasher = blake3::Hasher::new();
  hasher.update(&buf);
  let mut output = [0; N];
  for _ in 1..N {
    hasher.finalize_xof().fill(&mut output);
    hasher.update(&output);
  }
  let mut output = [0; 16];
  hasher.finalize_xof().fill(&mut output);
  output.into()
}

pub struct PasswordHash {
  buf: Buffer,
}

impl Task for PasswordHash {
  type Output = Buffer;
  type JsValue = Buffer;

  fn compute(&mut self) -> napi::Result<Self::Output> {
    Ok(_password_hash(&self.buf))
  }

  fn resolve(&mut self, _: Env, output: Self::Output) -> napi::Result<Self::JsValue> {
    Ok(output)
  }
}

#[napi]
pub fn password_hash(buf: Buffer) -> AsyncTask<PasswordHash> {
  AsyncTask::new(PasswordHash { buf })
}
// for i in 0..cx.len() {
//     let bin = to_bin(cx, i)?;
//     hasher.update(&bin);
// }
// jswait(cx, async move {
//     let mut output = [0; N];
//     for _ in 1..N {
//         hasher.finalize_xof().fill(&mut output);
//         hasher.update(&output);
//     }
//     let mut output = [0; 16];
//     hasher.finalize_xof().fill(&mut output);
//     Ok(Box::<[u8]>::from(&output[..]))
// })?
// }

// use image::EncodableLayout;
// use thiserror::Error;
// use tiny_skia::PremultipliedColorU8;
// use usvg::TreeParsing;
// use webp::Encoder;
//
//
// #[derive(Error, Debug)]
// pub enum Error {
//   #[error("tiny_skia::Pixmap::new return None")]
//   PIXMAP,
//
//   #[error("resvg::render return None")]
//   RESVG,
// }
//
// struct SvgWebp {
//   svg: Buffer,
//   quality: f32,
// }
//
// impl Task for SvgWebp {
//   type Output = Buffer;
//   type JsValue = Buffer;
//
//   fn compute(&mut self) -> Result<Self::Output> {
//     Ok(_svg_webp(&self.svg, self.quality)?)
//   }
//
//   fn resolve(&mut self, _: Env, output: Self::Output) -> Result<Self::JsValue> {
//     Ok(output)
//   }
// }
//
// fn _svg_webp(svg: &Buffer, quality: f32) -> anyhow::Result<Buffer> {
//   let opt = usvg::Options::default();
//   let rtree = usvg::Tree::from_data(svg.as_ref(), &opt)?;
//   let pixmap_size = rtree.size.to_screen_size();
//   let width = pixmap_size.width();
//   let height = pixmap_size.height();
//   if let Some(mut pixmap) = tiny_skia::Pixmap::new(width, height) {
//     // 去除透明度（默认是黑底，255-颜色会改为用白底）
//     for px in pixmap.pixels_mut() {
//       *px = PremultipliedColorU8::from_rgba(255 - px.red(), 255 - px.green(), 255 - px.blue(), 255)
//         .unwrap();
//     }
//     if resvg::render(
//       &rtree,
//       resvg::FitTo::Original,
//       tiny_skia::Transform::default(),
//       pixmap.as_mut(),
//     )
//     .is_some()
//     {
//       let img = pixmap.data();
//
//       let encoder = Encoder::from_rgba(img, width, height);
//       let encoded_webp = encoder.encode(quality);
//       let b = encoded_webp.as_bytes();
//       return Ok(b.into());
//     } else {
//       return Err(Error::RESVG)?;
//     }
//   }
//   Err(Error::PIXMAP)?
// }
//
// #[allow(dead_code)]
// #[napi]
// fn svg_webp(svg: Buffer, quality: f64) -> AsyncTask<SvgWebp> {
//   let quality = quality as f32;
//   AsyncTask::new(SvgWebp { svg, quality })
// }

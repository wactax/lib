use std::{
    hash::{BuildHasher, Hasher},
    net::IpAddr,
};

use anyhow::Result;
use napi::{
    bindgen_prelude::{AsyncTask, Buffer},
    Env, JsNumber, Task,
};
use ordered_varint::Variable;
use xxhash_rust::{xxh3::Xxh3Builder, xxh32::Xxh32};

#[macro_use]
extern crate napi_derive;

const XXHASHER: Xxh3Builder = Xxh3Builder::new();

const COOKIE_SAFE_CHAR: &str =
    "!#$%&'()*+-./0123456789:<>?@ABDEFGHIJKLMNQRSTUVXYZ[]^_`abdefghijklmnqrstuvxyz{|}~";

#[napi]
pub fn cookie_decode(s: String) -> Result<Buffer> {
    Ok(base_x::decode(COOKIE_SAFE_CHAR, &s)?.into())
}

#[napi]
pub fn cookie_encode(li: Buffer) -> String {
    base_x::encode(COOKIE_SAFE_CHAR, &li)
}

#[napi]
pub fn xxh64(li: Buffer) -> Buffer {
    let mut h64 = XXHASHER.build_hasher();
    h64.update(&li);
    h64.finish().to_le_bytes().into()
}

#[napi]
pub fn xxh32(li: Buffer) -> Buffer {
    let mut h = Xxh32::new(0);
    h.update(&li);
    h.digest().to_le_bytes().into()
}

#[napi]
pub fn xxh3_b36(li: Buffer) -> Buffer {
    let mut h64 = XXHASHER.build_hasher();
    h64.update(&li);
    let r = h64.finish().to_le_bytes();
    let mut n = 0;
    while n < 6 {
        if r[n] != 0 {
            break;
        }
        n += 1;
    }
    base_x::encode(
        "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
        &r[n..],
    )
    .into()
}

#[napi]
pub fn ip_bin(ip: String) -> Result<Buffer> {
    let ip: IpAddr = ip.parse()?;
    Ok(match ip {
        IpAddr::V4(ip) => {
            let o = ip.octets();
            [o[0], o[1], o[2], o[3]].into()
        }
        IpAddr::V6(ip) => {
            let o = ip.octets();
            [
                o[0], o[1], o[2], o[3], o[4], o[5], o[6], o[7], o[8], o[9], o[10], o[11], o[12],
                o[13], o[14], o[15],
            ]
            .into()
        }
    })
}

pub fn is_ascii_digit(bytes: &[u8]) -> bool {
    bytes.iter().all(|i| {
        let i = *i;
        i.is_ascii_digit()
    })
}

#[napi]
pub fn tld(domain: Buffer) -> String {
    let mut domain = &domain[..];
    if let Some(d) = psl::domain(domain) {
        let bytes = d.suffix().as_bytes();
        let len = bytes.len();
        if len > 0 && !is_ascii_digit(bytes) {
            let mut n = domain.len() - len;
            n = n.saturating_sub(1);
            while n > 0 {
                let t = n - 1;
                if domain[t] == b'.' {
                    break;
                }
                n = t;
            }
            domain = &domain[n..]
        }
    }
    unsafe { String::from_utf8_unchecked(domain.into()) }
}

#[napi]
pub fn random_bytes(n: u32) -> Buffer {
    (0..n)
        .map(|_| rand::random::<u8>())
        .collect::<Vec<u8>>()
        .into()
}

#[napi]
pub fn z85_dump(bin: Buffer) -> String {
    z85::encode(bin)
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

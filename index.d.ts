/* tslint:disable */
/* eslint-disable */

/* auto-generated by NAPI-RS */

export function cookieDecode(s: string): Buffer
export function cookieEncode(li: Buffer): string
export function randomBytes(n: number): Buffer
export function z85Dump(bin: Buffer): Buffer
export function z85Load(bin: Buffer): Buffer
export function u64Bin(n: number): Buffer
export function binU64(n: Buffer): number
export function zipU64(li: Array<number>): Buffer
export function unzipU64(bin: Buffer): Array<number>
export function passwordHash(buf: Buffer): Promise<unknown>

export const mongoUser = {
  _id: '66b1dd9e559968c8b8766aec',
  userId:
    'function v4(options, buf, offset) {\n  if (_native.default.randomUUID && !buf && !options) {\n    return _native.default.randomUUID();\n  }\n  options = options || {};\n  const rnds = options.random || (options.rng || _rng.default)();\n\n  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`\n  rnds[6] = rnds[6] & 0x0f | 0x40;\n  rnds[8] = rnds[8] & 0x3f | 0x80;\n\n  // Copy bytes to buffer, if provided\n  if (buf) {\n    offset = offset || 0;\n    for (let i = 0; i < 16; ++i) {\n      buf[offset + i] = rnds[i];\n    }\n    return buf;\n  }\n  return (0, _stringify.unsafeStringify)(rnds);\n}',
  name: 'KARL',
  __v: 0,
};

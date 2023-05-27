const createSpyFunction = (...returnValues) => {
  let callCount = 0;
  const fn = (...args) => {
    fn.calls = [...(fn.calls || []), { args }];
    return returnValues[callCount++];
  }
  fn.wasCalledOnce = (...args) => {
    const actualArgs = fn.calls[0].args;
    if (callCount !== 1) return false;
    if (args.length === 0) return true;
    if (actualArgs.length !== args.length) return false;
    return args.every((expected, index) => expected === actualArgs[index]);
  };
  fn.wasCalledTwice = () => callCount === 2;
  return fn;
}
exports.createSpyFunction = createSpyFunction;
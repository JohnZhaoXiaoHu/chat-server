export default {
  id(...arg: any[]) {
    return [...arg].sort().join("_");
  }
};

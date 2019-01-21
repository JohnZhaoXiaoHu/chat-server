export default {
  unique(...arg: any[]) {
    return [...arg].sort().join("_");
  },
  filter(_id: string, id: string) {
    const ids = id.split("_");
    return ids.filter(id => id !== _id)[0] || ids[0];
  }
};

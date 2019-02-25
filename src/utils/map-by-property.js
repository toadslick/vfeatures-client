export default function mapBy(key, objects) {
  const map = {};
  objects.forEach(obj => {
    map[obj[key]] = obj;
  });
  return map;
};

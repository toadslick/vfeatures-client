export default function mapByID(objectArray) {
  const map = {};
  objectArray.forEach(obj => {
    map[obj.id] = obj;
  });
  return map;
};

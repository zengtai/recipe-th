import ListItem from "./ListItem";

export default function List({ items, SLOT_ID }) {
  return items.map((item, index) => {
    if (index == 0 || index == 2) {
      return <ListItem key={item.id} item={item} SLOT_ID={SLOT_ID} />;
    } else {
      return <ListItem key={item.id} item={item} />;
    }
  });
}

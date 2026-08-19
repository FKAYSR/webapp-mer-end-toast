import List from "../components/List";
import AddButton from "../components/AddButton";

export default function ShoppinglistPage() {
  return (
    <>
      <header>
        <AddButton />
      </header>
      <main>
        <List />
      </main>
    </>
  );
}

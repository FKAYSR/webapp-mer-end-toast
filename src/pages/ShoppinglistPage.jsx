import List from "../components/List";
import Navbar from "../components/Navbar";
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

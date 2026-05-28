import List from "../components/List";
import Navbar from "../components/Navbar";
import AddButton from "../components/AddButton";
// import VarerOpskriftSwicher from "../components/VarerOpskriftSwicher";
import ListPrice from "../components/ListPrice";

export default function ShoppinglistPage() {
  return (
    <>
      <header>
        <AddButton />
      </header>
      <main>
        {/* <VarerOpskriftSwicher /> */}
        <List />
      </main>
      <footer>
        <ListPrice />
      </footer>
    </>
  );
}

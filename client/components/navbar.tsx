import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
    return (
        <div className="bg-green-200 py-3">
        <nav className="w-[95%] mx-auto flex justify-between items-center ">
            <h1 className="text-2xl font-bold">FEED</h1>
            <div className="space-x-2">
            <Link href="/login"><Button variant="outline">Login</Button></Link>
            <Link href="/register"><Button>Sign Up</Button></Link>
            </div>
        </nav>
        </div>
    );
}
 
export default Navbar;
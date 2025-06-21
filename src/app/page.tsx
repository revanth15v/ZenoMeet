import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
   <div className="text-4xl font-bold text-green-500">
    Hello world
    <Button>
      Click me
    </Button>
    <button>
      hello
    </button>
   </div>
  );
}

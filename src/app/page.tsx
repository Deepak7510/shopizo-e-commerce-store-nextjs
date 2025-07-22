import { Button } from "@/components/ui/button";

export default async function HomePage() {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // 3 sec delay
  return (
    <div>
      <Button>E-Store</Button>
    </div>
  );
}

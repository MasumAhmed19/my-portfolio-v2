import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetHeader,
  SheetTitle 
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavMenu } from "./nav-menu";
import { Logo } from "./logo";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-9 w-9"
          aria-label="Open navigation menu"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[280px] sm:w-[350px] p-0" side="right">
        <SheetHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <Logo />
          </div>
        </SheetHeader>
        
        <div className="flex flex-col h-full px-6 py-4">
          <div className="flex-1">
            <NavMenu 
              orientation="vertical" 
              className="mt-8 w-full" 
            />
          </div>
          
          {/* Optional footer content */}
          <div className="mt-auto pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              © 2025 Masum Ahmed
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

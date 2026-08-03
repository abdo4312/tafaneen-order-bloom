
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
// Importing a Google icon from a hypothetical icon library
// If you don't have one, you can use an SVG or another icon solution
const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M44.5 24.3H42.7V24.3C42.7 23.3 42.6 22.4 42.4 21.5H24.5V28.5H35.3C34.7 31.4 32.7 33.8 29.8 35.3V40.2H36.2C41.2 35.8 44.5 29.8 44.5 24.3Z" fill="#4285F4"/>
      <path d="M24.5 45C30.9 45 36.2 42.7 40.2 38.6L34.1 34.3C31.9 35.8 28.6 36.8 24.5 36.8C18.6 36.8 13.7 32.9 11.9 27.8H5.4V32.4C8.4 39.9 15.9 45 24.5 45Z" fill="#34A853"/>
      <path d="M11.9 21.2C11.2 19.3 11.2 17.2 11.9 15.3V10.7H5.4C3.1 15.8 3.1 21.7 5.4 26.8L11.9 21.2Z" fill="#FBBC05"/>
      <path d="M24.5 9.8C27.7 9.8 30.6 11.1 32.9 13.1L38.4 7.6C34.2 3.8 29.5 1 24.5 1C15.9 1 8.4 6.1 5.4 13.6L11.9 18.2C13.7 13.1 18.6 9.8 24.5 9.8Z" fill="#EA4335"/>
    </svg>
  );


interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { loginWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // Save the fact that we're trying to log in from the cart
    localStorage.setItem('post-login-action', 'open-cart');
    const { error } = await loginWithGoogle();
    if (error) {
      toast({
        title: "خطأ",
        description: error || "فشل تسجيل الدخول باستخدام Google",
        variant: "destructive",
      });
    }
    // The dialog will close automatically upon successful Supabase redirect,
    // so we don't need to call onOpenChange(false) here.
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تسجيل الدخول أو إنشاء حساب</DialogTitle>
          <DialogDescription>
            استخدم حساب Google الخاص بك للمتابعة.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Button onClick={handleGoogleLogin} disabled={isLoading} className="w-full">
            {isLoading ? "جاري التحميل..." : <><GoogleIcon /> متابعة باستخدام Google</>}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

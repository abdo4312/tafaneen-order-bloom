import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="mb-8">
          <div className="text-6xl mb-4">🔜</div>
          <h1 className="text-4xl font-bold mb-4 text-primary">قريباً</h1>
          <p className="text-xl text-muted-foreground mb-6">
            في موقع تفانين
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            نعمل على إضافة هذه الصفحة لتقديم أفضل تجربة لكم
          </p>
        </div>
        <a 
          href="/" 
          className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 font-medium hover:bg-primary/90 transition-colors"
        >
          العودة للصفحة الرئيسية
        </a>
      </div>
    </div>
  );
};

export default NotFound;

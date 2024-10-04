export default function Footer() {
  return (
    <footer className="bg-white/50">
      <div className="container mx-auto flex justify-center items-center py-4">
        <div>&copy; {new Date().getFullYear()} Our Company Name</div>
      </div>
    </footer>
  );
}

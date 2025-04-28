// src/components/ui/Footer.jsx
function Footer() {
  return (
    <footer className="bg-primary text-white py-6">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">GameHub</h3>
          <p className="text-sm">
            Discover your next favorite game with our curated selection of titles.
          </p>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="/" className="hover:text-gray-100">
            Dashboard
          </a>
          <a href="/reviews" className="hover:text-gray-100">
            Reviews
          </a>
          <a href="/deals" className="hover:text-gray-100">
            Deals
          </a>
          <a href="/community" className="hover:text-gray-100">
            Community
          </a>
          <a href="/profile" className="hover:text-gray-100">
            Profile
          </a>
        </div>
        <p className="text-sm">
          © 2025 GameHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
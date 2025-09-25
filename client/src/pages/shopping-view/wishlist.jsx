function Wishlist() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Wishlist</h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-5xl mb-4">❤️</div>
          <h2 className="text-2xl font-semibold mb-4">Wishlist Coming Soon</h2>
          <p className="text-gray-700 mb-6">
            We&#39;re working on bringing you a fantastic wishlist feature where you can save your favorite items 
            and easily access them later.
          </p>
          <p className="text-gray-600">
            Stay tuned for updates!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
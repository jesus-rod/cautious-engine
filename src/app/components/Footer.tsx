export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex justify-center items-center py-4 px-7 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300">
      <p className="text-center">
        Copyright &copy; {currentYear}
      </p>
    </footer>
  );
}
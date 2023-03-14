std::string prompt(const std::string& message) {
  std::cout << message << "\n";

  std::string line;
  std::getline(std::cin, line);

  return line;
}

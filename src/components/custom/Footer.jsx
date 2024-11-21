import { useContext } from "react";
import ThemeContext from "@/context/ThemeContext";
import { FaSquareXTwitter, FaInstagram, FaSquareFacebook, FaLinkedin  } from "react-icons/fa6";

function Footer() {
    const { darkMode } = useContext(ThemeContext);

    return (
        <footer
            className={`py-8 px-6 border-t-2 
            ${darkMode ? "bg-[#0d0d1a] text-gray-300 border-[#23213c]" : "bg-[#f9f9f9] text-gray-800 border-[#dcdcdc]"}`}
        >
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Branding Section */}
                <div>
                    <h2 className="text-xl font-bold">TripVerse</h2>
                    <p className="mt-2 text-sm">
                        Your trusted companion for crafting personalized journeys. Discover, explore, and create memories.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-lg font-bold mb-4">Quick Links</h2>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="/" className="hover:underline">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="/" className="hover:underline">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href="/" className="hover:underline">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="/" className="hover:underline">
                                Terms of Service
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Social Media Links */}
                <div>
                    <h2 className="text-lg font-bold mb-4">Connect With Us</h2>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                                <FaSquareFacebook className="h-8 w-8"></FaSquareFacebook>
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                                <FaSquareXTwitter className="h-8 w-8"></FaSquareXTwitter>

                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                                <FaInstagram className="h-8 w-8"></FaInstagram>

                            </a>
                        </li>
                        <li>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                                <FaLinkedin className="h-8 w-8"></FaLinkedin>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-8 text-center border-t pt-4 text-sm">
                <p>
                    &copy; {new Date().getFullYear()} TripVerse. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;

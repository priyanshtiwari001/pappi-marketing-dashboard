import Link from "next/link";
import PaapiLogo from "./paapi-logo";

export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 pt-6 mt-8 text-sm text-gray-500">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>&copy; {new Date().getFullYear()} Paapi. All rights reserved.</p>
                <div className="flex gap-4">
                    <Link target="_blank" href="https://paapi.ai/privacy" className="hover:text-gray-800 transition">Privacy</Link>
                    <Link href="mailto:dan@paapi.ai" className="hover:text-gray-800 transition">Contacts</Link>
                </div>
            </div>
        </footer>
    )
}
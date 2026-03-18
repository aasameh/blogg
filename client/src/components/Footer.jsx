const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-400 mt-auto">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                        <span className="text-xl font-bold text-white">Selvedge</span>
                    </div>
                    <div className="text-sm">
                        &copy; {currentYear} Selvedge. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

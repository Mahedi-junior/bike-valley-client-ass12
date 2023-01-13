import React from 'react';

const Footer = () => {
    return (
        <footer className="px-4 divide-y bg-white">
            <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
                <div className="lg:w-1/3">
                    <div className="flex justify-center space-x-3 lg:justify-start">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-400">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="flex-shrink-0 w-5 h-5 rounded-full dark:text-gray-900">
                                <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
                            </svg>
                        </div>
                        <span className="self-center text-2xl font-semibold">Cell Swap</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase text-gray-800 font-semibold">Product</h3>
                        <ul className="space-y-1 ">
                            <li>
                                <span rel="noopener noreferrer">Features</span>
                            </li>
                            <li>
                                <span rel="noopener noreferrer">Integrations</span>
                            </li>
                            <li>
                                <span rel="noopener noreferrer">Pricing</span>
                            </li>
                            <li>
                                <span rel="noopener noreferrer">FAQ</span>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase text-gray-800 font-semibold">Company</h3>
                        <ul className="space-y-1">
                            <li>
                                <span rel="noopener noreferrer">Privacy</span>
                            </li>
                            <li>
                                <span rel="noopener noreferrer">Terms of Service</span>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="uppercase text-gray-800 font-semibold">Developers</h3>
                        <ul className="space-y-1">
                            <li>
                                <span rel="noopener noreferrer">Public API</span>
                            </li>
                            <li>
                                <span rel="noopener noreferrer">Documentation</span>
                            </li>
                            <li>
                                <span rel="noopener noreferrer">Guides</span>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
            <div className="py-6 text-sm text-center text-gray-800">© {new Date().getFullYear()} Cell Swap All Rights Reserved</div>
        </footer>
    );
};

export default Footer;
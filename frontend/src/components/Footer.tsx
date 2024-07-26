import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-white">
            <div className="max-w-2xl mx-auto text-slate-600 py-10">
                <div className="text-center">
                    <h3 className="text-3xl mb-3">Download our app</h3>
                    <p>Get the best deals today! Every day.</p>
                    <div className="flex justify-center my-10">

                        <Link to="/">
                        <div className="flex items-center border w-auto rounded-lg px-4 py-2 mx-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                            className="w-8" />
                                <div className="text-left ml-4">
                                    <p className="text-xs text-slate-400">Download on </p>
                                    <p className="text-sm md:text-base"> Google Play Store </p>
                                </div>
                        </div>
                        </Link>

                        <Link to="/">
                        <div className="flex items-center border w-auto rounded-lg px-4 py-2 mx-2">
                            <img src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                            className="w-8" />
                                <div className="text-left ml-4">
                                    <p className="text-xs text-slate-400">Download on </p>
                                    <p className="text-sm md:text-base"> Google Play Store </p>
                                </div>
                        </div>
                        </Link>
                    </div>
                </div>

                <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-slate-600">
                    <p className="order-2 md:order-1 mt-8 md:mt-0">
                        DeconEats.com &copy; {new Date().getFullYear()} All Rights Reserved.
                    </p>
                    <div className="order-1 md:order-2">
                        <Link className="px-2 hover:underline" to="/">About us</Link>
                        <Link className="px-2 hover:underline" to="/">Contact us</Link>
                        <Link className="px-2 hover:underline" to="/">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
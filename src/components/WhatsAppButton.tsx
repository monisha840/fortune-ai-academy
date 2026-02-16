import { motion } from "framer-motion";

const WhatsAppButton = () => {
    return (
        <motion.a
            href="https://wa.me/919952270424" // Using the number from Footer
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_16px_rgba(37,211,102,0.6)] border border-[#25D366]/30 transition-shadow cursor-pointer group"
            aria-label="Chat on WhatsApp"
        >
            {/* WhatsApp Icon SVG */}
            <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 fill-white group-hover:fill-white/90 transition-colors"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.698c1.005.572 2.173.871 3.282.871 3.181 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-2.846-.848-.907-.387-1.479-.846-1.583-.984-.139-.184-.523-.699-.523-1.334 0-.636.333-.951.488-1.111.127-.13.3-.178.473-.178.13 0 .265.006.376.027.108.021.168.053.216.142l.602 1.48c.05.118.006.26-.062.381-.088.156-.219.296-.285.378-.078.096-.16.143-.075.292.085.149.373.613.805.998.55.49 1.021.642 1.21.729.141.066.236.036.315-.054.103-.117.433-.505.548-.68.114-.175.253-.146.417-.087.164.06.945.446 1.109.526.164.08.273.118.312.185.04.067.04.385-.104.79zM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20.372C10.121 20.372 8.421 19.828 7.027 18.962L4.439 19.664L5.196 16.902C4.192 15.399 3.628 13.785 3.628 12C3.628 7.378 7.378 3.628 12 3.628C16.622 3.628 20.372 7.378 20.372 12C20.372 16.622 16.622 20.372 12 20.372Z" />
            </svg>

            {/* Pulsing Ring Effect */}
            <div className="absolute inset-0 rounded-full border border-white opacity-0 group-hover:animate-ping" />
        </motion.a>
    );
};

export default WhatsAppButton;

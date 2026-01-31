import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useServices } from '@/hooks/useFirebaseData';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const AllServices = () => {
    const { services, loading } = useServices();
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="pt-24 pb-20">
                <div className="section-container">
                    {/* Back Button */}
                    <motion.button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <ArrowLeft size={20} />
                        Back
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                            All <span className="gradient-text">Services</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl">
                            Discover my full range of digital marketing and production services.
                        </p>
                        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4" />
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {services.map((service, index) => (
                            <Link key={service.id} to={`/service/${service.id}`}>
                                <motion.div
                                    className="card-elevated overflow-hidden group cursor-pointer h-full"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ y: -10 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                                        {service.image ? (
                                            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-6xl opacity-50">📦</div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                            {service.description}
                                        </p>
                                        <div className="flex items-center text-primary text-sm font-medium">
                                            Learn More
                                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AllServices;

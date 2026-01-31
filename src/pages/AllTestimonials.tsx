import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Quote } from 'lucide-react';
import { useTestimonials } from '@/hooks/useFirebaseData';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const AllTestimonials = () => {
    const { testimonials, loading } = useTestimonials();
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
                            Client <span className="gradient-text">Testimonials</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl">
                            Hear what my clients have to say about our partnership and results.
                        </p>
                        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4" />
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                className="card-elevated p-6 relative h-full"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -5 }}
                            >
                                <Quote className="absolute top-4 right-4 text-primary/20" size={40} />

                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold overflow-hidden">
                                        {testimonial.image ? (
                                            <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                                        ) : (
                                            testimonial.name.charAt(0)
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{testimonial.name}</h4>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className={i < testimonial.stars ? 'fill-primary text-primary' : 'text-muted'}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-muted-foreground leading-relaxed">
                                    "{testimonial.feedback}"
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AllTestimonials;

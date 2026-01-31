import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Folder } from 'lucide-react';
import { useProjects } from '@/hooks/useFirebaseData';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const AllProjects = () => {
    const { projects, loading } = useProjects();
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
                            My <span className="gradient-text">Portfolio</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl">
                            A collection of all my works, projects, and successful campaigns.
                        </p>
                        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4" />
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="card-elevated overflow-hidden group"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                                    {project.image ? (
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Folder size={48} className="text-primary/30" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                                        {project.description}
                                    </p>
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-primary text-sm font-medium hover:underline"
                                        >
                                            View Project
                                            <ExternalLink size={14} className="ml-1" />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AllProjects;

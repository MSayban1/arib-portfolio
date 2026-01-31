import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react';
import { usePosts } from '@/hooks/useFirebaseData';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const AllPosts = () => {
    const { posts, loading } = usePosts();
    const navigate = useNavigate();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

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
                            All <span className="gradient-text">Posts</span>
                        </h1>
                        <p className="text-muted-foreground max-w-2xl">
                            Knowledge, tips, and insights on the digital marketing landscape.
                        </p>
                        <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4" />
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {posts.map((post, index) => (
                            <Link key={post.id} to={`/post/${post.id}`}>
                                <motion.article
                                    className="card-elevated overflow-hidden group cursor-pointer h-full"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                                        {post.image ? (
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
                                                📝
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                            <Calendar size={14} />
                                            {formatDate(post.date)}
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                                            {post.content}
                                        </p>
                                        <div className="flex items-center text-primary text-sm font-medium">
                                            Read More
                                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </motion.article>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AllPosts;

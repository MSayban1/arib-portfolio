import { useState, useEffect } from 'react';
import { Profile, Skill, Service, Project, Testimonial, Post, SocialLinks, CreatorInfo, subscribeToData } from '@/lib/firebase';

// Timeout for loading state (15 seconds)
const LOADING_TIMEOUT = 15000;

// Default data for initial state
const defaultProfile: Profile = {
  name: "",
  headline1: "",
  headline2: "",
  intro: "",
  picture: "",
  bannerImage: "",
  yearsExperience: 0,
  clientsWorked: 0
};

const defaultSocialLinks: SocialLinks = {
  email: "",
  linkedin: "",
  facebook: "",
  instagram: ""
};

const defaultCreatorInfo: CreatorInfo = {
  name: "SABAN PRODUCTIONS",
  link: ""
};

export const useConnection = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    return subscribeToData('.info/connected', (data) => {
      setConnected(!!data);
    });
  }, []);

  return connected;
};

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const isConnected = useConnection();

  useEffect(() => {
    let mounted = true;

    // Set timeout to stop loading after 15 seconds
    const timeout = setTimeout(() => {
      if (mounted) {
        setLoading(false);
        console.warn('Firebase loading timed out');
      }
    }, LOADING_TIMEOUT);

    const unsubscribe = subscribeToData('profile', (data) => {
      if (mounted) {
        if (data) {
          setProfile({ ...defaultProfile, ...data });
        } else {
          console.log('No profile data found in RTDB at "profile" path');
        }
        setLoading(false);
        clearTimeout(timeout);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  return { profile, loading, isConnected };
};

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const timeout = setTimeout(() => {
      if (mounted) setLoading(false);
    }, LOADING_TIMEOUT);

    const unsubscribe = subscribeToData('skills', (data) => {
      if (mounted) {
        if (data) {
          const skillsList = Object.entries(data).map(([id, skill]) => ({
            id,
            ...(skill as Skill)
          }));
          setSkills(skillsList);
        }
        setLoading(false);
        clearTimeout(timeout);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  return { skills, loading };
};

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const timeout = setTimeout(() => {
      if (mounted) setLoading(false);
    }, LOADING_TIMEOUT);

    const unsubscribe = subscribeToData('services', (data) => {
      if (mounted) {
        if (data) {
          const servicesList = Object.entries(data).map(([id, service]) => ({
            id,
            ...(service as Service)
          }));
          setServices(servicesList);
        }
        setLoading(false);
        clearTimeout(timeout);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  return { services, loading };
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const timeout = setTimeout(() => {
      if (mounted) setLoading(false);
    }, LOADING_TIMEOUT);

    const unsubscribe = subscribeToData('projects', (data) => {
      if (mounted) {
        if (data) {
          const projectsList = Object.entries(data).map(([id, project]) => ({
            id,
            ...(project as Project)
          }));
          setProjects(projectsList);
        }
        setLoading(false);
        clearTimeout(timeout);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  return { projects, loading };
};

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const timeout = setTimeout(() => {
      if (mounted) setLoading(false);
    }, LOADING_TIMEOUT);

    const unsubscribe = subscribeToData('testimonials', (data) => {
      if (mounted) {
        if (data) {
          const testimonialsList = Object.entries(data)
            .map(([id, testimonial]) => ({
              id,
              ...(testimonial as Testimonial)
            }))
            .filter(t => t.approved !== false);
          setTestimonials(testimonialsList);
        }
        setLoading(false);
        clearTimeout(timeout);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  return { testimonials, loading };
};

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const timeout = setTimeout(() => {
      if (mounted) setLoading(false);
    }, LOADING_TIMEOUT);

    const unsubscribe = subscribeToData('posts', (data) => {
      if (mounted) {
        if (data) {
          const postsList = Object.entries(data).map(([id, post]) => ({
            id,
            ...(post as Post)
          }));
          setPosts(postsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        }
        setLoading(false);
        clearTimeout(timeout);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  return { posts, loading };
};

export const useSocialLinks = () => {
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(defaultSocialLinks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const timeout = setTimeout(() => {
      if (mounted) setLoading(false);
    }, LOADING_TIMEOUT);

    const unsubscribe = subscribeToData('socialLinks', (data) => {
      if (mounted) {
        if (data) {
          setSocialLinks({ ...defaultSocialLinks, ...data });
        }
        setLoading(false);
        clearTimeout(timeout);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  return { socialLinks, loading };
};

export const useCreatorInfo = () => {
  const [creatorInfo, setCreatorInfo] = useState<CreatorInfo>(defaultCreatorInfo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const timeout = setTimeout(() => {
      if (mounted) setLoading(false);
    }, LOADING_TIMEOUT);

    const unsubscribe = subscribeToData('creatorInfo', (data) => {
      if (mounted) {
        if (data) {
          setCreatorInfo({ ...defaultCreatorInfo, ...data });
        }
        setLoading(false);
        clearTimeout(timeout);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  return { creatorInfo, loading };
};

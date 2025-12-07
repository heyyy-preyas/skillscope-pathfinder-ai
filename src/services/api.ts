import axios from 'axios';
import { supabase } from '@/integrations/supabase/client';

const API_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
    baseURL: API_URL,
});

// Add Auth Token to every request
apiClient.interceptors.request.use(async (config) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
    }
    return config;
});

export const api = {
    // User
    getProfile: () => apiClient.get('/users/profile'),
    updateProfile: (data: any) => apiClient.put('/users/profile', data),

    // Assessment
    submitAssessment: (answers: any) => apiClient.post('/assessment/submit', { answers }),
    getHistory: () => apiClient.get('/assessment/history'),
    getQuestions: () => apiClient.get('/assessment/questions'),

    // Jobs
    // Jobs
    getTrendingJobs: (query: string, location?: string) => apiClient.get('/jobs/trends', { params: { domain: query, location } }),

    // Roadmap
    getRoadmap: () => apiClient.get('/roadmap'),
    generateRoadmap: (goal: string) => apiClient.post('/roadmap/generate', { career_goal: goal }),

    // Careers
    getCareers: () => apiClient.get('/careers'),
    getCareerDetail: (id: string) => apiClient.get(`/careers/${id}`),

    // Mentors
    getAllMentors: () => apiClient.get('/mentors'),
    getMentorProfile: (id: string) => apiClient.get(`/mentors/${id}`),
    bookSession: (data: { mentorId: string, timeSlot: string }) => apiClient.post('/mentors/book', data),
};

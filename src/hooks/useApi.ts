import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/lib/api';

// Jobs hooks
export const useJobs = (params?: {
  skip?: number;
  limit?: number;
  search?: string;
  location?: string;
  job_type?: string;
}) => {
  return useQuery({
    queryKey: ['jobs', params],
    queryFn: () => apiService.getJobs(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useJob = (jobId: string) => {
  return useQuery({
    queryKey: ['job', jobId],
    queryFn: () => apiService.getJobById(jobId),
    enabled: !!jobId,
  });
};

// Health check hook
export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => apiService.healthCheck(),
    retry: 1,
    staleTime: 30 * 1000, // 30 seconds
  });
};

// Auth hooks
export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      apiService.login(email, password),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (userData: { email: string; password: string; full_name: string }) =>
      apiService.register(userData),
  });
};

// User profile hooks
export const useUserProfile = (token: string) => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: () => apiService.getUserProfile(token),
    enabled: !!token,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userData, token }: { userData: any; token: string }) =>
      apiService.updateUserProfile(userData, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });
};
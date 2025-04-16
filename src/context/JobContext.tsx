import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Job {
  id: number;
  title: string;
  company: string;
  platform: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  followUpDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface JobContextType {
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateJob: (id: number, job: Partial<Job>) => void;
  deleteJob: (id: number) => void;
  getJobById: (id: number) => Job | undefined;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('jobs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (newJob: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const job: Job = {
      ...newJob,
      id: Date.now(),
      createdAt: now,
      updatedAt: now
    };
    setJobs(prevJobs => [...prevJobs, job]);
  };

  const updateJob = (id: number, updatedFields: Partial<Job>) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === id
          ? { ...job, ...updatedFields, updatedAt: new Date().toISOString() }
          : job
      )
    );
  };

  const deleteJob = (id: number) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
  };

  const getJobById = (id: number) => {
    return jobs.find(job => job.id === id);
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, updateJob, deleteJob, getJobById }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
}; 
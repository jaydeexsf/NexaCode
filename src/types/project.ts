export interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  industry?: string;
  technologies?: string[];
}

export interface WorkItemProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  industry?: string;
  technologies?: string[];
} 
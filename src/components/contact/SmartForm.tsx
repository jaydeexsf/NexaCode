import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  company: z.string().optional(),
  service: z.string({
    required_error: "Please select a service."
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters."
  }),
  newsletter: z.boolean().default(false),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Handle URL params for pre-filled values
const useUrlParams = () => {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split('?')[1]);
  
  return {
    hasEstimate: params.get('estimate') === 'true',
    estimatedPrice: params.get('price'),
    service: params.get('service'),
  };
};

const STORAGE_KEY = 'nexaweb_contact_form_draft';

/**
 * Smart contact form with auto-save functionality
 */
const SmartForm: React.FC = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const { toast } = useToast();
  const urlParams = useUrlParams();
  
  // Default form values
  const defaultValues: ContactFormValues = {
    name: '',
    email: '',
    company: '',
    service: urlParams.service || '',
    message: urlParams.hasEstimate 
      ? `I'm interested in a project with an estimated budget of ${urlParams.estimatedPrice}.`
      : '',
    newsletter: false,
  };
  
  // Form setup with validation
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });
  
  // Load saved form data from localStorage
  useEffect(() => {
    const savedForm = localStorage.getItem(STORAGE_KEY);
    if (savedForm) {
      try {
        const parsed = JSON.parse(savedForm);
        // Only use saved values if there's no query param values
        if (!urlParams.hasEstimate) {
          form.reset(parsed);
        }
        setLastSaved(new Date().toLocaleString());
      } catch (e) {
        console.error('Error loading saved form:', e);
      }
    }
  }, []);
  
  // Auto-save form as user types
  useEffect(() => {
    const subscription = form.watch((value) => {
      // Don't save if form is empty or not modified
      if (
        !value.name && 
        !value.email && 
        !value.company && 
        !value.service && 
        !value.message
      ) {
        return;
      }
      
      // Debounce saving to reduce performance impact
      setIsSaving(true);
      const timeoutId = setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
        setLastSaved(new Date().toLocaleString());
        setIsSaving(false);
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);
  
  const onSubmit = async (formData: ContactFormValues) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Clear saved form data after successful submission
      localStorage.removeItem(STORAGE_KEY);
      
      // Show success notification
      toast({
        title: "Message Sent",
        description: "We'll get back to you as soon as possible!",
      });
      
      // Reset form
      form.reset(defaultValues);
      setLastSaved(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem submitting your message. Please try again.",
      });
    }
  };
  
  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="mb-6">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Your company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="mb-6">
          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are you interested in?</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                    <SelectItem value="ai-integration">AI Integration</SelectItem>
                    <SelectItem value="ecommerce">E-commerce Solutions</SelectItem>
                    <SelectItem value="custom">Custom Project</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="mb-6">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your project" 
                    rows={4}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="mb-6">
          <FormField
            control={form.control}
            name="newsletter"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Subscribe to our newsletter</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex items-center">
          <Button 
            type="submit" 
            disabled={form.formState.isSubmitting}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors"
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </Button>
          
          <div className="ml-4 text-sm text-gray-500 dark:text-gray-400 italic">
            {isSaving ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Saving draft...
              </motion.span>
            ) : lastSaved ? (
              <span>Draft saved at {lastSaved}</span>
            ) : (
              <span>Your data is automatically saved as you type</span>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SmartForm;

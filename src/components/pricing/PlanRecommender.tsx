import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Link } from 'wouter';

interface PlanRecommenderProps {
  questions?: string[];
}

interface Plan {
  id: string;
  title: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    title: 'Basic',
    price: 2000,
    description: 'Perfect for small businesses just starting out',
    features: [
      'Up to 5 pages',
      'Responsive design',
      'Basic SEO optimization',
      'Contact form',
      '1 month of support'
    ]
  },
  {
    id: 'standard',
    title: 'Standard',
    price: 5000,
    description: 'Ideal for growing businesses with more complex needs',
    features: [
      'Up to 10 pages',
      'Responsive design',
      'Advanced SEO package',
      'CMS integration',
      'Contact form with validation',
      'Google Analytics setup',
      '3 months of support'
    ]
  },
  {
    id: 'premium',
    title: 'Premium',
    price: 10000,
    description: 'Comprehensive solution for established businesses',
    features: [
      'Up to 20 pages',
      'Responsive design',
      'Advanced SEO package',
      'Custom CMS development',
      'E-commerce functionality',
      'Custom integrations',
      'Analytics dashboard',
      'Performance optimization',
      '6 months of support'
    ]
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    price: 20000,
    description: 'Tailored solution for large organizations',
    features: [
      'Unlimited pages',
      'Responsive design',
      'Complete SEO strategy',
      'Custom CMS development',
      'Advanced e-commerce features',
      'Multiple third-party integrations',
      'AI-powered recommendations',
      'Advanced analytics & reporting',
      'Performance optimization',
      'Security audit',
      '12 months of priority support'
    ]
  }
];

/**
 * AI-powered plan recommender component that suggests the best plan
 * based on user answers to a few simple questions
 */
const PlanRecommender: React.FC<PlanRecommenderProps> = ({
  questions = [
    "What's your monthly traffic?",
    "Need e-commerce?",
    "CMS preference?"
  ]
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendedPlan, setRecommendedPlan] = useState<Plan | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  // Options for each question
  const questionOptions = [
    ['Less than 1,000', 'Between 1,000 - 10,000', 'Between 10,000 - 50,000', 'More than 50,000'],
    ['No', 'Basic online store', 'Advanced e-commerce'],
    ['No preference', 'WordPress', 'Custom CMS']
  ];
  
  const handleSelectOption = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      // Move to next question
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Choose recommended plan based on answers
      determineRecommendedPlan(newAnswers);
      setShowResult(true);
    }
  };
  
  const determineRecommendedPlan = (userAnswers: string[]) => {
    // Simple recommendation algorithm based on answers
    let score = 0;
    
    // Traffic score
    switch (userAnswers[0]) {
      case 'Less than 1,000':
        score += 1;
        break;
      case 'Between 1,000 - 10,000':
        score += 2;
        break;
      case 'Between 10,000 - 50,000':
        score += 3;
        break;
      case 'More than 50,000':
        score += 4;
        break;
    }
    
    // E-commerce score
    switch (userAnswers[1]) {
      case 'No':
        score += 0;
        break;
      case 'Basic online store':
        score += 2;
        break;
      case 'Advanced e-commerce':
        score += 3;
        break;
    }
    
    // CMS score
    switch (userAnswers[2]) {
      case 'No preference':
        score += 1;
        break;
      case 'WordPress':
        score += 2;
        break;
      case 'Custom CMS':
        score += 3;
        break;
    }
    
    // Determine plan based on score
    let planId: string;
    if (score <= 3) {
      planId = 'basic';
    } else if (score <= 6) {
      planId = 'standard';
    } else if (score <= 8) {
      planId = 'premium';
    } else {
      planId = 'enterprise';
    }
    
    // Find and mark the recommended plan
    const recommended = plans.find(plan => plan.id === planId);
    if (recommended) {
      const updatedPlans = plans.map(plan => ({
        ...plan,
        recommended: plan.id === planId
      }));
      
      setRecommendedPlan(updatedPlans.find(plan => plan.recommended) || null);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setRecommendedPlan(null);
    setShowResult(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="questions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8"
          >
            <h3 className="text-xl font-bold mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </h3>
            <p className="text-lg font-medium mb-6">{questions[currentQuestion]}</p>
            
            <RadioGroup className="gap-4">
              {questionOptions[currentQuestion].map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option}
                    id={`option-${currentQuestion}-${index}`}
                    onClick={() => handleSelectOption(option)}
                  />
                  <Label 
                    htmlFor={`option-${currentQuestion}-${index}`}
                    className="text-base cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            {currentQuestion > 0 && (
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                Back
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Your Recommended Plan</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Based on your needs, we recommend the following plan:
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recommendedPlan && (
                <Card className="border-2 border-primary relative">
                  <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-lg font-medium text-sm">
                    Recommended
                  </div>
                  <CardHeader>
                    <CardTitle>{recommendedPlan.title}</CardTitle>
                    <div className="mt-2 mb-1">
                      <span className="text-3xl font-bold">${recommendedPlan.price.toLocaleString()}</span>
                    </div>
                    <CardDescription>{recommendedPlan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {recommendedPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href="/contact?service=custom">
                        Get Started 
                        <ChevronRight className="h-5 w-5 ml-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              <div className="space-y-4">
                <h4 className="text-lg font-bold">Why we recommend this plan:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>Based on your traffic needs of <strong>{answers[0]}</strong></span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>E-commerce requirements: <strong>{answers[1]}</strong></span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>CMS preference: <strong>{answers[2]}</strong></span>
                  </li>
                </ul>
                
                <div className="pt-4">
                  <Button variant="outline" onClick={resetQuiz} className="mr-4">
                    Retake Quiz
                  </Button>
                  <Button asChild>
                    <Link href="/pricing">
                      View All Plans
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlanRecommender;

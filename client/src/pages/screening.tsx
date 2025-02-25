import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { symptomsList, riskFactorsList } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  symptoms: z.array(z.string()).min(0),
  riskFactors: z.array(z.string()).min(0),
});

type FormData = z.infer<typeof formSchema>;

export default function Screening() {
  const [step, setStep] = useState(1);
  const [results, setResults] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: [],
      riskFactors: [],
    },
  });

  const { setValue, watch } = form;
  const symptoms = watch("symptoms");
  const riskFactors = watch("riskFactors");

  const toggleSymptom = (symptom: string, checked: boolean) => {
    const currentSymptoms = symptoms || [];
    const updatedSymptoms = checked
      ? [...currentSymptoms, symptom]
      : currentSymptoms.filter(s => s !== symptom);
    setValue("symptoms", updatedSymptoms);
  };

  const toggleRiskFactor = (factor: string, checked: boolean) => {
    const currentFactors = riskFactors || [];
    const updatedFactors = checked
      ? [...currentFactors, factor]
      : currentFactors.filter(f => f !== factor);
    setValue("riskFactors", updatedFactors);
  };

  async function onSubmit(data: FormData) {
    try {
      console.log("Form data:", data); // Debug log
      const riskLevel = calculateRiskLevel(data);
      console.log("Risk level:", riskLevel); // Debug log
      const recommendations = getRecommendations(riskLevel);

      await apiRequest("POST", "/api/screening", {
        ...data,
        riskLevel,
        recommendations,
      });

      setResults(recommendations);
      setStep(3);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit screening. Please try again.",
        variant: "destructive",
      });
    }
  }

  function calculateRiskLevel(data: FormData): string {
    const symptomCount = data.symptoms.length;
    const riskFactorCount = data.riskFactors.length;

    console.log(`Symptoms count: ${symptomCount}, Risk factors count: ${riskFactorCount}`); // Debug log

    if (symptomCount >= 3 || riskFactorCount >= 2) {
      return "high";
    }
    if (symptomCount >= 2 || riskFactorCount >= 1) {
      return "medium";
    }
    return "low";
  }

  function getRecommendations(riskLevel: string): string {
    switch (riskLevel) {
      case "high":
        return "Based on your responses, we strongly recommend immediate HIV testing and consultation with a healthcare provider. Multiple symptoms and risk factors indicate the need for prompt medical attention.";
      case "medium":
        return "Consider scheduling an appointment with a healthcare provider soon to discuss your symptoms and risk factors. Early testing is recommended for your peace of mind.";
      default:
        return "Your risk appears to be low, but it's still important to practice safe behaviors and get regular check-ups. Consider routine HIV testing as part of your healthcare.";
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Progress value={step * 33} className="mb-8" />

      {step === 1 && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="mb-6 text-2xl font-semibold">Symptom Check</h2>
            <div className="space-y-4">
              {symptomsList.map((symptom) => (
                <div key={symptom} className="flex items-center space-x-2">
                  <Checkbox
                    id={symptom}
                    checked={symptoms?.includes(symptom)}
                    onCheckedChange={(checked) => toggleSymptom(symptom, checked as boolean)}
                  />
                  <label htmlFor={symptom} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {symptom}
                  </label>
                </div>
              ))}
            </div>
            <Button className="mt-6" onClick={() => setStep(2)}>
              Next
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="mb-6 text-2xl font-semibold">Risk Assessment</h2>
            <div className="space-y-4">
              {riskFactorsList.map((factor) => (
                <div key={factor} className="flex items-center space-x-2">
                  <Checkbox
                    id={factor}
                    checked={riskFactors?.includes(factor)}
                    onCheckedChange={(checked) => toggleRiskFactor(factor, checked as boolean)}
                  />
                  <label htmlFor={factor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {factor}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-6 space-x-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={form.handleSubmit(onSubmit)}>
                Get Results
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && results && (
        <Card>
          <CardContent className="pt-6">
            <h2 className="mb-6 text-2xl font-semibold">Results</h2>
            <Alert>
              <AlertDescription>{results}</AlertDescription>
            </Alert>
            <Button className="mt-6" onClick={() => {
              form.reset();
              setStep(1);
            }}>
              Start Over
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
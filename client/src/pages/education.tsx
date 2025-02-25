import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Education() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-8 text-3xl font-bold">Understanding HIV</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>What is HIV?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              HIV (Human Immunodeficiency Virus) is a virus that attacks the body's immune system. If left untreated, HIV can lead to AIDS (Acquired Immunodeficiency Syndrome).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="transmission">
                <AccordionTrigger>How is HIV transmitted?</AccordionTrigger>
                <AccordionContent>
                  HIV can be transmitted through:
                  <ul className="ml-6 list-disc">
                    <li>Unprotected sexual contact</li>
                    <li>Sharing needles or syringes</li>
                    <li>Mother to child during pregnancy, birth, or breastfeeding</li>
                    <li>Contact with infected blood</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="prevention">
                <AccordionTrigger>How can HIV be prevented?</AccordionTrigger>
                <AccordionContent>
                  <ul className="ml-6 list-disc">
                    <li>Use condoms during sexual activity</li>
                    <li>Never share needles</li>
                    <li>Get tested regularly</li>
                    <li>Consider PrEP (pre-exposure prophylaxis) if at high risk</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="treatment">
                <AccordionTrigger>What treatments are available?</AccordionTrigger>
                <AccordionContent>
                  HIV is treated with antiretroviral therapy (ART). This involves taking a combination of HIV medicines daily. While there's no cure for HIV, ART can help people live long, healthy lives and reduce the risk of transmission.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Early Symptoms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Early HIV symptoms may include:</p>
            <ul className="ml-6 list-disc text-muted-foreground">
              <li>Fever and chills</li>
              <li>Rash</li>
              <li>Night sweats</li>
              <li>Muscle aches</li>
              <li>Sore throat</li>
              <li>Fatigue</li>
              <li>Swollen lymph nodes</li>
              <li>Mouth ulcers</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

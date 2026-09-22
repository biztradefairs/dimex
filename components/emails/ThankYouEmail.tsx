import React from 'react';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
} from '@react-email/components';

interface ThankYouEmailProps {
  name: string;
  formType: string;
}

export default function ThankYouEmail({ name, formType }: ThankYouEmailProps) {
  const getFormTitle = () => {
    switch (formType) {
      case 'contact':
        return 'Contact Form Submission';
      case 'brochure':
        return 'Event Brochure Request';
      case 'post-show-report':
        return 'Post-Show Report Request';
      case 'exhibiting-enquiry':
        return 'Exhibiting Enquiry';
      default:
        return 'Form Submission';
    }
  };

  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting DIEMEX Expo</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>Thank You, {name}!</Heading>
            <Text style={subtitle}>
              We have received your {getFormTitle().toLowerCase()}
            </Text>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Dear {name},
            </Text>
            
            <Text style={paragraph}>
              Thank you for getting in touch with Diemex Expo. 
              We have received your enquiry and our team will review it shortly.
            </Text>

            <Text style={paragraph}>
              One of our representatives will contact you within 1-2 business days 
              to discuss your requirements further.
            </Text>

            <Section style={ctaSection}>
              <Text style={ctaText}>While you wait, you might want to:</Text>
              
              <ul style={list}>
                <li style={listItem}>
                  <a href="https://diemex.in/event-brochure" style={link}>
                    Download our Event Brochure
                  </a>
                </li>
                <li style={listItem}>
                  <a href="https://diemex.in/post-show-report" style={link}>
                    View our Post-Show Report
                  </a>
                </li>
                <li style={listItem}>
                  <a href="https://diemex.in/sectors" style={link}>
                    Explore Event Sectors
                  </a>
                </li>
              </ul>
            </Section>

            <Button
              href="https://diemex.in"
              style={button}
            >
              Visit Our Website
            </Button>
          </Section>

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerTitle}>Diemex Expo</Text>
            <Text style={footerText}>
             24-26 March 2027 | Auto Cluster Exhibition Centre, Pimpri-chinchwad|Pune, India
            </Text>
            <Text style={footerContact}>
              Phone: +91 91483 19993| Email: pad@maxxmedia.in
            </Text>
            <Text style={footerNote}>
              This is an automated email. Please do not reply to this message.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f4faff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  maxWidth: '600px',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  overflow: 'hidden' as const,
};

const header = {
  backgroundColor: '#1e40af',
  color: '#ffffff',
  padding: '40px 20px',
  textAlign: 'center' as const,
};

const h1 = {
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 0 10px 0',
  color: '#ffffff',
};

const subtitle = {
  fontSize: '16px',
  color: '#dbeafe',
  margin: 0,
};

const content = {
  padding: '40px 30px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#374151',
  margin: '0 0 20px 0',
};

const ctaSection = {
  backgroundColor: '#f0f9ff',
  padding: '20px',
  borderRadius: '8px',
  margin: '30px 0',
};

const ctaText = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#1e40af',
  margin: '0 0 15px 0',
};

const list = {
  paddingLeft: '20px',
  margin: '0 0 20px 0',
};

const listItem = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#374151',
  margin: '0 0 10px 0',
};

const link = {
  color: '#1e40af',
  textDecoration: 'underline',
};

const button = {
  backgroundColor: '#1e40af',
  color: '#ffffff',
  padding: '12px 30px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  display: 'block',
  width: 'fit-content',
  margin: '30px auto 0',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '0',
};

const footer = {
  padding: '30px',
  backgroundColor: '#1f2937',
  color: '#ffffff',
  textAlign: 'center' as const,
};

const footerTitle = {
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 10px 0',
  color: '#ffffff',
};

const footerText = {
  fontSize: '14px',
  color: '#d1d5db',
  margin: '0 0 10px 0',
};

const footerContact = {
  fontSize: '14px',
  color: '#9ca3af',
  margin: '0 0 20px 0',
};

const footerNote = {
  fontSize: '12px',
  color: '#6b7280',
  margin: 0,
};
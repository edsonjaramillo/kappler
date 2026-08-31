// import type { Quote } from "@repo/data/quotes";
import { exampleQuote as quote } from "@repo/data/quotes";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "react-email";

// type QuoteEmailProps = {
// quote: Quote;
// domain: string;
// };

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export default function QuoteEmail() {
  const domain = "http://localhost:3001";
  const actionButtons = [
    {
      label: "Extend",
      href: `${domain}/extend`,
      className: "bg-[#0b3768] text-white",
    },
    {
      label: "Already ordered",
      href: `${domain}/ordered`,
      className: "border border-solid border-[#0b3768] bg-white text-[#0b3768]",
    },
    {
      label: "Close quote",
      href: `${domain}/close`,
      className: "bg-red-600 text-white",
    },
  ];

  const subtotal = quote.lineItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Html lang="en">
      <Head />
      <Preview>
        Following up on quote {quote.id} — valid through {quote.validityDate}
      </Preview>
      <Tailwind>
        <Body className="m-0 bg-slate-100 px-3 py-8 font-sans text-slate-700">
          <Container className="mx-auto max-w-[640px] bg-white">
            <Section className="bg-[#071b33] px-8 py-7">
              <Row>
                <Column className="align-middle">
                  <Text className="m-0 inline-block border border-dashed border-slate-400 px-4 py-3 text-xs font-bold tracking-[2px] text-white">
                    LOGO GOES HERE
                  </Text>
                </Column>
                <Column className="align-middle text-right">
                  <Text className="m-0 text-sm font-semibold text-white">YOUR COMPANY</Text>
                  <Text className="m-0 mt-1 text-xs text-slate-300">Quotes made simple</Text>
                </Column>
              </Row>
            </Section>
            <Section className="px-8 pb-3 pt-8">
              <Text className="m-0 text-xs font-bold uppercase tracking-[2px] text-blue-700">
                Quote {quote.id}
              </Text>
              <Text className="mb-0 mt-1 text-xs font-medium text-slate-500">
                Valid through {quote.validityDate}
              </Text>
              <Heading className="mb-2 mt-4 text-3xl font-bold leading-tight text-[#071b33]">
                Following up on your quote
              </Heading>
              <Text className="m-0 text-base leading-7 text-slate-600">
                Hi {quote.purchaserName}, we wanted to follow up on the quote we sent to
                {` ${quote.companyName}`}. Please review the details below and let us know if you
                would like to extend it, have already placed your order, or no longer need this
                quote.
              </Text>
            </Section>
            <Section className="px-8 py-5">
              <Row>
                {actionButtons.map((action) => (
                  <Column key={action.label} className="w-1/3 px-1">
                    <Button
                      href={action.href}
                      className={`box-border w-full rounded-md px-2 py-3 text-center text-sm font-semibold ${action.className}`}>
                      {action.label}
                    </Button>
                  </Column>
                ))}
              </Row>
            </Section>
            <Section className="mx-8 py-4">
              <Text className="mb-2 mt-0 text-xs font-bold uppercase tracking-wide text-[#0b3768]">
                Shipping to
              </Text>
              <Text className="m-0 text-sm leading-6 text-slate-700">
                {quote.shipToAddress.addressLine1}
                <br />
                {quote.shipToAddress.city}, {quote.shipToAddress.state}{" "}
                {quote.shipToAddress.postalCode}
                <br />
                {quote.shipToAddress.country}
              </Text>
            </Section>

            <Section className="px-8 py-7">
              <Heading as="h2" className="mb-4 mt-0 text-lg font-bold text-[#071b33]">
                Quote details
              </Heading>
              {quote.lineItems.map((item) => (
                <Section key={item.product} className="border-b border-solid border-slate-200 py-4">
                  <Text className="m-0 text-sm font-bold text-[#071b33]">{item.product}</Text>
                  <Text className="mb-3 mt-1 text-xs text-slate-500">{item.description}</Text>
                  <Row className="bg-slate-50">
                    <Column className="w-[18%] px-3 py-2">
                      <Text className="m-0 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                        Qty
                      </Text>
                      <Text className="mb-0 mt-1 text-sm text-slate-700">{item.quantity}</Text>
                    </Column>
                    <Column className="w-[36%] px-2 py-2 text-right">
                      <Text className="m-0 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                        Unit price
                      </Text>
                      <Text className="mb-0 mt-1 text-sm text-slate-700">
                        {formatCurrency(item.price)}
                      </Text>
                    </Column>
                    <Column className="w-[46%] px-3 py-2 text-right">
                      <Text className="m-0 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                        Amount
                      </Text>
                      <Text className="mb-0 mt-1 text-sm font-semibold text-[#071b33]">
                        {formatCurrency(item.price * item.quantity)}
                      </Text>
                    </Column>
                  </Row>
                </Section>
              ))}
              <Row>
                <Column className="pt-5 text-right">
                  <Text className="m-0 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Total
                  </Text>
                  <Text className="mb-0 mt-1 text-2xl font-bold text-[#071b33]">
                    {formatCurrency(subtotal)}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className="bg-[#071b33] px-8 py-6 text-center">
              <Text className="m-0 text-sm font-semibold text-white">
                Questions about your quote?
              </Text>
              <Text className="mb-0 mt-2 text-xs leading-5 text-slate-300">
                Reply to this email or contact sales@yourcompany.com · (000) 000-0000
              </Text>
              <Hr className="my-5 border-slate-600" />
              <Text className="m-0 text-xs text-slate-400">
                © 2026 Your Company · 123 Business Street, City, ST 00000
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

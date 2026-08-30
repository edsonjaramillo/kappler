import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { signUpBodySchema, type SignUpBody } from "@repo/contracts/auth-contracts";
import { Button } from "@repo/ui/button";
import { Form } from "@repo/ui/form";
import { Input, InputColumns, InputError, InputGroup, Label } from "@repo/ui/inputs";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";

import { apiClient } from "#/lib/api-client";

export const Route = createFileRoute("/sign-up")({ component: RouteComponent });

function RouteComponent() {
  const navigate = useNavigate();
  const form = useForm<SignUpBody>({ resolver: standardSchemaResolver(signUpBodySchema) });

  async function onValid(data: SignUpBody) {
    await apiClient.auth.signUp({ body: data });
    await navigate({ to: "/sign-in" });
  }

  const onSubmit = form.handleSubmit(onValid);

  return (
    <div>
      <FormProvider {...form}>
        <Form className="mx-auto space-y-5 p-6" onSubmit={onSubmit}>
          <NameFields /> <EmailField /> <PasswordField />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            width="fit"
            color="primary"
            className="ml-auto">
            {form.formState.isSubmitting ? "Submitting..." : "Sign Up"}
          </Button>
        </Form>
      </FormProvider>
    </div>
  );
}

function NameFields() {
  return (
    <InputColumns>
      <InputGroup>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          placeholder="First Name"
          type="text"
          autoComplete="given-name"
          name="firstName"
        />
        <InputError name="firstName" />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          placeholder="Last Name"
          type="text"
          autoComplete="family-name"
          name="lastName"
        />
        <InputError name="lastName" />
      </InputGroup>
    </InputColumns>
  );
}

function EmailField() {
  return (
    <InputGroup>
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="Email" type="email" autoComplete="email" name="email" />
      <InputError name="email" />
    </InputGroup>
  );
}

function PasswordField() {
  return (
    <InputGroup>
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        placeholder="Password"
        type="password"
        autoComplete="new-password"
        name="password"
      />
      <InputError name="password" />
    </InputGroup>
  );
}

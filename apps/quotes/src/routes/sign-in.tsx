import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { signInBodySchema, type SignInBody } from "@repo/contracts/auth-contracts";
import { Button } from "@repo/ui/button";
import { Form } from "@repo/ui/form";
import { Input, InputError, InputGroup, Label } from "@repo/ui/inputs";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";

import { useSessionContext } from "#/context/admin-context";
import { apiClient } from "#/lib/api-client";

export const Route = createFileRoute("/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { setSession } = useSessionContext();

  const form = useForm<SignInBody>({
    resolver: standardSchemaResolver(signInBodySchema),
    defaultValues: { email: "edson.jaramillo@example.com", password: "abcd1234" },
  });

  async function onValid(data: SignInBody) {
    const { status, body } = await apiClient.auth.signIn({ body: data });
    console.log({ status, body });
    if (status === 200) {
      setSession({ name: body.payload.firstName });
      void navigate({ to: "/" });
    }
  }

  const onSubmit = form.handleSubmit(onValid);

  return (
    <div>
      <FormProvider {...form}>
        <Form className="mx-auto space-y-5 p-6" onSubmit={onSubmit}>
          <EmailInput /> <PasswordInput />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            width="fit"
            color="primary"
            className="ml-auto">
            {form.formState.isSubmitting ? "Submitting..." : "Sign In"}
          </Button>
        </Form>
      </FormProvider>
    </div>
  );
}

function EmailInput() {
  return (
    <InputGroup>
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="Email" type="email" autoComplete="email" name="email" />
      <InputError name="email" />
    </InputGroup>
  );
}

function PasswordInput() {
  return (
    <InputGroup>
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        placeholder="Password"
        type="password"
        autoComplete="current-password"
        name="password"
      />
      <InputError name="password" />
    </InputGroup>
  );
}

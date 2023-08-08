"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { useLoginMutation } from "@/generated/graphql";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [_, login] = useLoginMutation()
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FormSchema>, e:any) {
    e.preventDefault();
    
    const response = await login({
      option: data
    })

    if(response.data?.login.errors) {
      const errors = response.data.login.errors;

      errors.forEach(({field, message}) => {
        form.setError(field, {message});
      })
    }

    if(response.data?.login.user) {
        router.push('/')
    }
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>

        <Separator className="my-4" />
        <p className="text-center text-sm text-gray-900">
          Don't have account?{" "}
          <Link href="/register" className="font-bold">
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;

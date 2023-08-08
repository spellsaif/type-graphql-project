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
import { useRegisterMutation, UserInput } from "@/generated/graphql";
import {useRouter} from "next/navigation"
import { errorMap } from "@/utils/error-map";

const FormSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const RegisterForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [_, register] = useRegisterMutation()
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof FormSchema>, e?:any) {
    e.preventDefault();
    console.log(data)
    const response = await register({
      option: data
    });

    if(response.data?.register.errors){
      const errors = response.data.register.errors
      errors.forEach(({field, message})=> {
        form.setError(field,{message} )
      })    

    }

    if(response.data?.register.user) {
      router.push('/');
    }
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
          Sign Up
        </Button>

        <Separator className="my-4" />
        <p className="text-center text-sm text-gray-900">
          Already have account?{" "}
          <Link href="/login" className="font-bold">
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default RegisterForm;

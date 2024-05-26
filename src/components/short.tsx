"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { trpc } from "@/app/_trpc/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, useToast } from "@/components/ui/use-toast"


const urlSchema = z.object({
    url: z.string().url({
    message: "Invalid URL",
    }).min(3).max(2048),
});

export function Short() {
    const [shortUrl, setShortUrl] = useState<string | null>(null);
    const [iSUrlNotCanEdit, setISUrlNotCanEdit] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [buttonText, setButtonText] = useState("Shorten");
    const [buttonType, setButtonType] = useState<"button" | "submit">("submit");
    
    const mutation = trpc.short.useMutation();

    const form = useForm<z.infer<typeof urlSchema>>({
        resolver: zodResolver(urlSchema),
        defaultValues: {
            url: "",
        },
    })

    useEffect(() => {
        setButtonDisabled(!form.formState.isValid);
    }, [form.formState.isValid]);

    async function onSubmit(values: z.infer<typeof urlSchema>) {
        const { url } = values;
        mutation.mutate({
            url,
            ads: false,
        });
    }

    useEffect(() => {
        if(mutation.error) {
              toast({
                title: "Error",
                description: mutation.error.message
              });
              return;
       }
       if(mutation.data) {
        setShortUrl(mutation.data.url);
        form.setValue("url", mutation.data.url);
        setButtonDisabled(false);
        setLoading(false);
        setButtonType("button");
        setButtonText("Copy");
       }
    }, [form, mutation.data, mutation.error]);

    function onReset() {
        setTimeout(() => {
        setShortUrl(null);
        setISUrlNotCanEdit(false);
        setButtonDisabled(true);
        setButtonType("submit");
        setButtonText("Shorten");
        form.reset();
        }, 3000);
    }
    return (
    <Form {...form}>
        <form className="mx-auto flex flex-col gap-2 min-[400px]:flex-row w-full justify-center md:w-80" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
                <FormItem>
                <FormControl>
              <Input className="w-full md:max-w-md flex-1" placeholder="Enter your URL" type="url" {...field} readOnly={iSUrlNotCanEdit} />
              </FormControl>
              <FormMessage />
                </FormItem>
            )} />
              <Button type={buttonType}
              disabled={buttonDisabled}
                onClick={() => {
                    if (shortUrl) {
                        navigator.clipboard.writeText(shortUrl);
                        toast({
                            title: "Copied to Clipboard",
                            description: shortUrl,
                        })
                        setButtonText("Copied");
                        onReset();
                    } else {
                    setButtonText("Shortening...");
                    setLoading(true);
                    setISUrlNotCanEdit(true);
                    }
                }}>
                {loading ? "Shortening..." : buttonText}
                </Button>
              </form>
            </Form>
            )
}
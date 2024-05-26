'use client';
import React, {useEffect, useState} from 'react';
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button"
import { AlertDialogTrigger, AlertDialogTitle, AlertDialogDescription, AlertDialogHeader, AlertDialogCancel, AlertDialogAction, AlertDialogFooter, AlertDialogContent, AlertDialog } from "@/components/ui/alert-dialog";

export default function Page({ params }: { params: { slug: string } }) {
    const [time, setTime] = useState(15);
    const [url, setUrl] = useState<string | null>(null);
    const [canStartCountdown, setCanStartCountdown] = useState(false);

    const {data} = trpc.url.useQuery({
        slug: params.slug,
    });
    const click = trpc.addVisit.useMutation();
    
    useEffect(() => {
    click.mutate({slug: params.slug});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(()=> {
        if(click.status === 'success' || click.status === 'error') {
            if(click.status === 'success' && data) {
                setUrl(data);
                setCanStartCountdown(true);
            }
        }
    },[click.status, data]);

    useEffect(() => {
        if(url){
            const interval = setInterval(() => {
                setTime((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [url]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 bg-gray-100" />
      <div className="container flex flex-col gap-4 justify-center py-10 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/relaxed">Redirecting you now</h1>
          <p className="text-gray-500 md:text-xl/relaxed xl:text-2xl/relaxed dark:text-gray-400">
            You will be redirected to the your URL in a few seconds.
          </p>
        </div>
        <div className="mx-auto w-full md:w-[200px]">
          <div />
        </div>
        <div className="mx-auto w-full md:w-[200px]">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full" variant="outline"
            disabled={!canStartCountdown || time > 0}
              >
                {canStartCountdown && time > 0 ? `Await ${time} seconds` : 'I\'m ready'}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='w-full'>
              <AlertDialogHeader>
                <AlertDialogTitle>We will redirect you now</AlertDialogTitle>
                <AlertDialogDescription>
                    <p className='mb-6'>Click continue if you trust the URL you are being redirected to.</p>
                    <code className="bg-gray-200 dark:bg-gray-800 p-2 rounded-md">{url}</code>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <a href={url!}>
                <AlertDialogAction className='w-full'>Continue</AlertDialogAction>
                </a>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}
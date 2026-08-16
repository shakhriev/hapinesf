"use client";

import { motion } from "framer-motion";

export default function VideoSection() {
  return (
    <section className="bg-white px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mx-auto max-w-3xl"
      >
        <h1 className="mb-12 text-center text-5xl font-light tracking-wide text-neutral-900">
          A Message For You
        </h1>

        <div className="space-y-8 text-lg leading-9 text-neutral-700">
          <p>Hey.</p>

          <p>
            I hope you're doing well.
          </p>

          <p>
            Before anything else, thank you for taking the time to read this.
          </p>

          <p>
            We both know things didn't end the way either of us imagined.
            Somewhere along the way, misunderstandings grew, distance crept in,
            and what once felt easy became difficult.
          </p>

          <p>
            I'm not here to decide who was right or wrong. I'm not here to
            revisit the past or change anything.
          </p>

          <p>
            I just wanted to apologize for the moments when I hurt you,
            knowingly or unknowingly. I'm sorry for my mistakes, and I'm sorry
            for the pain that came from my side.
          </p>

          <p>
            More than anything, though, I wanted to thank you.
          </p>

          <p>
            Thank you for the last three years.
          </p>

          <p>
            Thank you for every conversation, every laugh, every little
            adventure, every lesson, every moment we shared. Those memories will
            always be part of who I am, and I'll always be grateful that I got
            to experience them with you.
          </p>

          <p>
            I loved you deeply. Whether that changes anything now doesn't really
            matter. What matters is that it was real, and I'll always be
            grateful that life gave me the chance to love someone like you.
          </p>

          <p>
            This website isn't meant to revisit the past or decide who was right
            or wrong. I simply wanted our story to have one quiet, beautiful
            ending.
          </p>

          <p>
            I genuinely hope life gives you everything you've ever wished for.
          </p>

          <p>
            I hope your career is successful.
          </p>

          <p>
            I hope you keep chasing your dreams.
          </p>

          <p>
            I hope you laugh often.
          </p>

          <p>
            I hope you eat well, sleep enough, and take good care of yourself.
          </p>

          <p>
            And please... take care of your heart.
          </p>

          <p>
            I won't be there to remind you anymore, so do it for yourself...
            and maybe a little for the beautiful memories we shared.
          </p>

          <p>
            I'm proud of the person you are, and I'll always respect you.
          </p>

          <p>
            Thank you for everything you gave me.
          </p>

          <p>
            I truly wish you nothing but happiness, peace, and a life full of
            beautiful moments.
          </p>

          <p>Take care.</p>

          <p>Goodbye.</p>
        </div>
      </motion.div>
    </section>
  );
}
import ContactForm from "../components/ContactForm";

function Contact() {
  return (
    <div className="flex flex-col justify-center md:w-3/6 md:mt-6 md:text-lg">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-poppins text-3xl text-gray-900 font-bold py-5 w-5/6">
          Contact Us
        </h1>
        <p className="font-nunito text-gray-900 text-justify mb-4 w-5/6">
          Got a question, feedback, or just want to say hello? We'd love to hear
          from you! Reach out to us using the form below, and we'll get back to
          you as soon as we can. Your thoughts and inquiries are important to
          us, so don't hesitate to drop us a line!
        </p>
      </div>
      <ContactForm />
    </div>
  );
}

export default Contact;

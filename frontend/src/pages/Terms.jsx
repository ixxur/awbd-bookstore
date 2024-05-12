import Breadcrumbs from '../components/terms/breadcrumbs'
import Navigation from '../components/landing/navigation'
import Footer from '../components/landing/footer'

function Terms() {
  return (
    <section className="w-screen bg-gray-50">
      <div className="container mx-auto">
        <Navigation />

        <Breadcrumbs />

        <section className="mx-4 my-10">
          <p>
            Welcome to SquidBooks! These terms and conditions outline the rules
            and regulations for the use of SquidBooks Website, located at
            localhost:3000.
          </p>
          <p>
            By accessing this website we assume you accept these terms and
            conditions. Do not continue to use SquidBooks if you do not agree to
            take all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            1. Intellectual Property Rights
          </h2>
          <p>
            Other than the content you own, under these Terms, SquidBooks and/or
            its licensors own all the intellectual property rights and materials
            contained in this Website. You are granted a limited license only
            for purposes of viewing the material contained on this Website.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">2. Restrictions</h2>
          <p>You are specifically restricted from all of the following:</p>
          <ul className="list-disc ml-5">
            <li>Publishing any Website material in any other media;</li>
            <li>
              Selling, sublicensing and/or otherwise commercializing any Website
              material;
            </li>
            <li>Publicly performing and/or showing any Website material;</li>
            <li>
              Using this Website in any way that is or may be damaging to this
              Website;
            </li>
            <li>
              Using this Website in any way that impacts user access to this
              Website;
            </li>
            <li>
              Using this Website contrary to applicable laws and regulations, or
              in a way that causes, or may cause, harm to the Website, or to any
              person or business entity;
            </li>
            <li>
              Engaging in any data mining, data harvesting, data extracting or
              any other similar activity in relation to this Website, or while
              using this Website;
            </li>
            <li>
              Using this Website to engage in any advertising or marketing.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">3. Your Content</h2>
          <p>
            In these Website Standard Terms and Conditions, "Your Content" shall
            mean any audio, video, text, images, or other material you choose to
            display on this Website. By displaying Your Content, you grant
            SquidBooks a non-exclusive, worldwide, irrevocable, royalty-free,
            sublicensable license to use, reproduce, adapt, publish, translate
            and distribute it in any and all media.
          </p>
          <p>
            Your Content must be your own and must not be invading any
            third-party&apos;s rights. SquidBooks reserves the right to remove
            any of Your Content from this Website at any time, and for any
            reason, without notice.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">4. No warranties</h2>
          <p>
            This Website is provided "as is," with all faults, and SquidBooks
            expresses no representations or warranties, of any kind related to
            this Website or the materials contained on this Website. Also,
            nothing contained on this Website shall be interpreted as advising
            you.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            5. Limitation of liability
          </h2>
          <p>
            In no event shall SquidBooks, nor any of its officers, directors and
            employees, be held liable for anything arising out of or in any way
            connected with your use of this Website whether such liability is
            under contract. SquidBooks, including its officers, directors and
            employees shall not be held liable for any indirect, consequential
            or special liability arising out of or in any way related to your
            use of this Website.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            6. Indemnification
          </h2>
          <p>
            You hereby indemnify to the fullest extent SquidBooks from and
            against any and/or all liabilities, costs, demands, causes of
            action, damages and expenses arising in any way related to your
            breach of any of the provisions of these Terms.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">7. Severability</h2>
          <p>
            If any provision of these Terms is found to be invalid under any
            applicable law, such provisions shall be deleted without affecting
            the remaining provisions herein.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            8. Variation of Terms
          </h2>
          <p>
            SquidBooks is permitted to revise these terms at any time as it sees
            fit, and by using this Website you are expected to review these
            terms on a regular basis.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">9. Assignment</h2>
          <p>
            SquidBooks is allowed to assign, transfer, and subcontract its
            rights and/or obligations under these Terms without any
            notification. However, you are not allowed to assign, transfer, or
            subcontract any of your rights and/or obligations under these Terms.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            10. Entire Agreement
          </h2>
          <p>
            These Terms constitute the entire agreement between SquidBooks and
            you in relation to your use of this Website, and supersede all prior
            agreements and understandings.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            11. Governing Law & Jurisdiction
          </h2>
          <p>
            These Terms will be governed by and interpreted in accordance with
            the laws of the State and Country you reside in, and you submit to
            the non-exclusive jurisdiction of the state and federal courts
            located in your state/country for the resolution of any disputes.
          </p>
        </section>

        <Footer />
      </div>
    </section>
  )
}

export default Terms

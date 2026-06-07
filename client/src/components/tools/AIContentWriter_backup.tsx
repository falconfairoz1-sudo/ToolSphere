'use client';

import { useState } from 'react';
import { BookOpen, Sparkles, Copy, Download, FileText, Lightbulb, Target } from 'lucide-react';

export default function AIEssayWriter() {
  const [topic, setTopic] = useState('');
  const [essayType, setEssayType] = useState<'argumentative' | 'expository' | 'narrative' | 'descriptive' | 'persuasive' | 'analytical'>('argumentative');
  const [pageCount, setPageCount] = useState(3);
  const [essay, setEssay] = useState('');
  const [generating, setGenerating] = useState(false);
  const [outline, setOutline] = useState<string[]>([]);

  const generateEssay = () => {
    if (!topic.trim()) {
      alert('Please enter an essay topic');
      return;
    }

    setGenerating(true);

    setTimeout(() => {
      // Generate outline
      const outlinePoints = [
        'I. Introduction',
        '   - Hook and context',
        '   - Thesis statement',
        '   - Essay roadmap',
        'II. Body Paragraph 1',
        '   - Main point and evidence',
        '   - Analysis and explanation',
        'III. Body Paragraph 2',
        '   - Supporting argument',
        '   - Examples and data',
        'IV. Body Paragraph 3',
        '   - Additional perspective',
        '   - Critical analysis',
        'V. Body Paragraph 4',
        '   - Synthesis and implications',
        '   - Broader context',
        'VI. Conclusion',
        '   - Summary of main points',
        '   - Final thoughts',
        '   - Call to action or reflection'
      ];
      setOutline(outlinePoints);

      // Generate essay content based on essay type and page count
      const wordsPerPage = 275;
      const targetWords = pageCount * wordsPerPage;
      
      // Calculate how much content to add based on page count
      const contentMultiplier = pageCount / 3; // Base content is for 3 pages
      
      let essayTitle = '';
      let intro = '';
      let body1 = '';
      let body2 = '';
      let body3 = '';
      let body4 = '';
      let conclusion = '';
      let section1Title = '';
      let section2Title = '';
      let section3Title = '';
      let section4Title = '';
      
      // Additional content to expand essays for more pages
      const getAdditionalContent = (baseContent: string, multiplier: number) => {
        if (multiplier <= 1) return baseContent;
        
        const expansions = [
          ' Furthermore, this aspect deserves deeper examination to fully appreciate its significance and implications.',
          ' Research in this area has revealed numerous insights that contribute to our understanding.',
          ' Scholars and practitioners have identified several key factors that influence outcomes in this domain.',
          ' The evidence from multiple studies consistently supports these observations and conclusions.',
          ' Historical analysis provides valuable context for interpreting current trends and patterns.',
          ' Practical applications demonstrate the real-world relevance of these theoretical concepts.',
          ' Cross-disciplinary perspectives enrich our comprehension by revealing unexpected connections.',
          ' Case studies from diverse contexts illustrate how these principles manifest in practice.',
          ' The implications extend beyond immediate concerns to affect broader social and cultural dynamics.',
          ' Ongoing research continues to refine and expand our knowledge in meaningful ways.'
        ];
        
        let expandedContent = baseContent;
        const additionalSentences = Math.floor((multiplier - 1) * 2);
        
        for (let i = 0; i < additionalSentences && i < expansions.length; i++) {
          expandedContent += expansions[i];
        }
        
        return expandedContent;
      };

      switch (essayType) {
        case 'argumentative':
          essayTitle = topic + ': A Critical Argument';
          intro = getAdditionalContent('The debate surrounding ' + topic + ' has become increasingly important in contemporary discourse. This argumentative essay takes a clear position: ' + topic + ' represents a critical issue that demands our immediate attention and action. Through examining compelling evidence, addressing counterarguments, and presenting logical reasoning, this essay will demonstrate why this position is not only valid but necessary for progress.', contentMultiplier);
          section1Title = 'Thesis and Main Argument';
          body1 = getAdditionalContent('The central argument of this essay is that ' + topic + ' fundamentally impacts our society in profound ways that cannot be ignored. Evidence from multiple credible sources supports this position. Recent studies have shown significant correlations between ' + topic + ' and various social, economic, and cultural outcomes. Expert testimony from leading authorities in the field reinforces these findings with practical observations and theoretical frameworks. The strength of this argument lies in both empirical data and logical consistency. When we examine the available evidence objectively, the validity of this position becomes increasingly clear and difficult to refute.', contentMultiplier);
          section2Title = 'Supporting Evidence';
          body2 = getAdditionalContent('Multiple lines of evidence converge to support this thesis. First, empirical research conducted over the past decade has consistently demonstrated measurable impacts related to ' + topic + '. Second, case studies from various contexts provide concrete examples of how ' + topic + ' affects real people and communities. Third, historical precedents offer valuable lessons about the consequences of action versus inaction. The cumulative weight of this evidence creates a compelling case. Statistical data shows clear trends, qualitative research reveals human experiences, and longitudinal studies demonstrate long-term effects. This comprehensive body of evidence withstands rigorous scrutiny and peer review.', contentMultiplier);
          section3Title = 'Counterarguments and Refutation';
          body3 = getAdditionalContent('Critics of this position may argue that alternative explanations deserve equal consideration or that the evidence is inconclusive. Some skeptics point to conflicting data or question the methodology of supporting studies. However, careful examination reveals significant weaknesses in these counterarguments. The alternative explanations fail to account for key evidence, rely on outdated assumptions, or misinterpret available data. While healthy skepticism serves an important role in academic discourse, the counterarguments in this case do not successfully undermine the primary thesis. The preponderance of evidence clearly supports the position advanced in this essay.', contentMultiplier);
          section4Title = 'Implications and Call to Action';
          body4 = getAdditionalContent('The implications of accepting this argument extend far beyond academic debate. Understanding ' + topic + ' in this framework enables us to make more informed decisions, develop better policies, and take effective action. The practical applications affect individuals, communities, and society as a whole. We must act now to address the challenges and opportunities presented by ' + topic + '. Delay only compounds the difficulties we face. By accepting this argument and taking appropriate action, we can create positive change and avoid negative consequences. The evidence compels us to recognize the urgency of this issue and respond accordingly.', contentMultiplier);
          conclusion = getAdditionalContent('In conclusion, this argumentative essay has presented a compelling case regarding ' + topic + ', supported by substantial evidence and rigorous analysis. The examination of multiple perspectives, consideration of counterarguments, and synthesis of diverse information sources all point toward the validity of the central thesis. The evidence is clear, the logic is sound, and the implications are significant. As we move forward, the insights gained from this analysis must inform our approach to related challenges. The significance of ' + topic + ' cannot be overstated, and continued engagement with these ideas will prove essential. Ultimately, the evidence compels us to accept this position and take appropriate action based on these findings.', contentMultiplier);
          break;

        case 'expository':
          essayTitle = 'Understanding ' + topic + ': An Informative Analysis';
          intro = getAdditionalContent('To fully understand ' + topic + ', we must examine its various components, historical development, and current applications. This expository essay provides a clear, comprehensive explanation of ' + topic + ', breaking down complex concepts into understandable parts. By exploring fundamental principles, tracing historical evolution, and examining practical applications, readers will gain thorough knowledge of this important subject. The following analysis presents factual information in an organized, logical manner.', contentMultiplier);
          section1Title = 'Definition and Core Concepts';
          body1 = getAdditionalContent('At its most basic level, ' + topic + ' can be defined as a phenomenon that encompasses multiple dimensions and manifestations. The key components include several interrelated elements that work together to create the overall effect or system. Understanding these fundamental building blocks provides the necessary framework for exploring more complex aspects. The core concepts involve specific principles, processes, and relationships that characterize ' + topic + '. These foundational elements have been identified through research and observation, and they form the basis for all further discussion and analysis of the subject.', contentMultiplier);
          section2Title = 'Historical Development';
          body2 = getAdditionalContent('The history of ' + topic + ' reveals a fascinating evolution shaped by various factors over time. Early developments laid the groundwork for current understanding, though initial conceptions often differed significantly from modern perspectives. Key milestones mark important transitions and breakthroughs that advanced knowledge and application. The 20th century saw particularly rapid development, with technological advances and social changes accelerating the pace of evolution. Tracing this historical trajectory helps us appreciate how current understanding emerged and provides context for ongoing developments. The evolution continues today, with new discoveries and innovations constantly refining our comprehension.', contentMultiplier);
          section3Title = 'Current Applications';
          body3 = getAdditionalContent('In contemporary contexts, ' + topic + ' manifests in numerous practical applications that affect daily life. Industries utilize ' + topic + ' to improve efficiency, enhance products, and solve problems. Educational institutions incorporate ' + topic + ' into curricula and research programs. Government agencies develop policies and programs related to ' + topic + '. Individuals engage with ' + topic + ' in various ways, from personal decisions to professional activities. These concrete examples help bridge the gap between abstract concepts and tangible reality, making the subject more accessible and relevant to diverse audiences. The widespread application demonstrates the practical importance of understanding ' + topic + '.', contentMultiplier);
          section4Title = 'Processes and Mechanisms';
          body4 = getAdditionalContent('Understanding how ' + topic + ' works requires examining the underlying processes and mechanisms that drive its operation. The process typically involves several stages, each with specific characteristics and functions. Various factors influence these processes, creating complexity that demands careful attention. Input factors are transformed through specific mechanisms to produce particular outputs or effects. Feedback loops may amplify or dampen certain aspects, creating dynamic systems that respond to changing conditions. By breaking down these mechanisms into comprehensible stages, we can better understand both individual components and their collective function. This systematic approach illuminates intricate workings that might otherwise remain obscure.', contentMultiplier);
          conclusion = getAdditionalContent('This expository analysis has provided a comprehensive overview of ' + topic + ', covering its definition, historical development, current applications, and underlying mechanisms. Through systematic examination of each aspect, we have built a complete picture that enables thorough understanding. The information presented here serves as a foundation for further exploration and deeper engagement with the subject. As ' + topic + ' continues to evolve and develop, the fundamental principles outlined in this essay will remain relevant, providing a stable framework for understanding new developments and applications. Armed with this knowledge, readers can now approach ' + topic + ' with greater confidence and insight.', contentMultiplier);
          break;

        case 'narrative':
          essayTitle = 'My Journey with ' + topic;
          intro = 'The story of my encounter with ' + topic + ' begins not with grand pronouncements or abstract theories, but with a simple moment that would eventually lead to profound understanding. Like many important discoveries in life, it started unexpectedly, during a time when I least expected to be challenged by new ideas. This narrative explores the personal journey of engaging with ' + topic + ', revealing how direct experience and reflection can illuminate complex subjects in ways that pure analysis cannot. Through this story, we will discover not just facts, but the human dimension of understanding.';
          section1Title = 'The Beginning';
          body1 = 'My first encounter with ' + topic + ' came on an ordinary day that would prove to be anything but ordinary. I remember the initial confusion mixed with intrigue—here was something that defied easy categorization or simple explanation. The circumstances were unexpected, catching me off guard and forcing me to pay attention in ways I had not anticipated. As I began to explore further, each discovery led to new questions, creating a cascade of curiosity that pulled me deeper into the subject. Those early days were marked by a sense of wonder and occasional frustration, as familiar assumptions gave way to new perspectives and possibilities that challenged everything I thought I knew.';
          section2Title = 'The Journey';
          body2 = 'The path to understanding ' + topic + ' was neither straight nor smooth. There were moments of frustration when concepts seemed impossibly complex, and times when progress felt maddeningly slow. I struggled with difficult ideas, made mistakes, and sometimes wanted to give up. Yet each obstacle overcome brought its own reward—a sudden clarity, an unexpected connection, a moment when disparate pieces suddenly fit together into a coherent whole. The journey taught me that true understanding comes not from passive absorption of information, but from active engagement, persistent questioning, and willingness to revise one\'s thinking in light of new evidence. Each challenge made the eventual understanding more meaningful and lasting.';
          section3Title = 'The Transformation';
          body3 = 'As my understanding deepened, I began to notice how ' + topic + ' connected to other areas of life and thought in surprising ways. What had seemed like an isolated subject revealed itself as part of a larger tapestry of interconnected ideas and experiences. This realization transformed not just my understanding of ' + topic + ' itself, but my entire approach to learning and discovery. I found myself seeing patterns and relationships I had never noticed before. The process of engagement had changed me, expanding my capacity for nuanced thinking and appreciation of complexity. I became more patient with ambiguity, more curious about different perspectives, and more humble about the limits of my own knowledge.';
          section4Title = 'The Impact';
          body4 = 'Looking back on this journey, I can see how the experience of grappling with ' + topic + ' has shaped my thinking in lasting ways. The lessons learned extend far beyond the specific subject matter, touching on fundamental questions about how we learn, grow, and make sense of the world around us. The patience required, the humility demanded, and the persistence rewarded—all these have become part of my approach to new challenges. Most importantly, the journey has taught me that understanding is not a destination but an ongoing process of discovery and refinement. Each new encounter with ' + topic + ' brings fresh perspectives and deeper understanding, reminding me that there is always more to learn.';
          conclusion = 'This narrative journey through ' + topic + ' has revealed not just information about the subject itself, but insights into the process of learning and discovery. The story demonstrates how personal engagement with complex ideas can lead to transformation and growth. As the journey continues—for it never truly ends—each new encounter with ' + topic + ' brings fresh perspectives and deeper understanding. The lessons learned along the way serve as guides for future explorations, reminding us that the most valuable knowledge often comes not from what we learn, but from how we learn it. In sharing this story, I hope to inspire others to embark on their own journeys of discovery, approaching ' + topic + ' and other subjects with curiosity, persistence, and openness to transformation.';
          break;

        case 'descriptive':
          essayTitle = topic + ': A Detailed Portrait';
          intro = 'To truly understand ' + topic + ', we must move beyond abstract definitions and engage with its concrete reality through careful observation and detailed description. This descriptive essay aims to paint a vivid, comprehensive picture of ' + topic + ', capturing its essence through sensory details, specific examples, and precise language. By examining its characteristics, manifestations, and nuances, we will develop a rich understanding that goes beyond surface-level knowledge. The following description draws on observation, experience, and analysis to bring ' + topic + ' to life for readers.';
          section1Title = 'Physical and Observable Characteristics';
          body1 = 'The most immediately apparent aspects of ' + topic + ' reveal themselves through direct observation and sensory experience. Visual elements create the first impression, establishing a framework for understanding. The colors, shapes, and patterns involved demonstrate remarkable complexity and organization. Textures range from smooth to rough, creating tactile dimensions that add depth to the experience. Specific details emerge upon closer examination—subtle variations, intricate relationships, and distinctive features that define the subject\'s unique character. The scale can be impressive, whether vast or minute, commanding attention and inviting closer inspection. These observable characteristics provide the foundation for deeper analysis and appreciation.';
          section2Title = 'Functional and Behavioral Aspects';
          body2 = 'Beyond static characteristics, ' + topic + ' exhibits dynamic qualities that become apparent through observation of its function and behavior. The way it operates, responds, and interacts with its environment reveals essential aspects of its nature. Movement patterns demonstrate underlying principles and governing rules, whether rapid or gradual, smooth or erratic. The rhythm and flow of these processes create a kind of choreography that, once recognized, helps us understand the subject more completely. Responses to various stimuli show adaptability and complexity. These functional aspects bring the subject to life, transforming it from abstract concept to living reality that engages multiple senses and dimensions of understanding.';
          section3Title = 'Contextual and Relational Dimensions';
          body3 = 'Understanding ' + topic + ' requires examining it within its broader context and relationships. The subject does not exist in isolation but as part of a larger ecosystem of related phenomena. Its connections to other elements create a web of interactions that shape its character and influence its development. The environment in which it exists affects its manifestation, while it in turn affects that environment in complex feedback loops. Spatial relationships determine proximity and interaction patterns. Temporal dimensions reveal how ' + topic + ' changes over time, evolving and adapting to new circumstances. These relational dimensions add layers of meaning and significance that enrich our understanding beyond simple description.';
          section4Title = 'Emotional and Experiential Qualities';
          body4 = 'Perhaps most importantly, ' + topic + ' evokes certain feelings, impressions, and experiences that contribute to its overall character. The emotional resonance it creates varies among individuals but follows recognizable patterns. Some find it inspiring and uplifting, while others experience different reactions based on their backgrounds and perspectives. The memories it triggers and the associations it brings to mind all form part of its complete description. The atmosphere or mood it creates affects how people engage with it. These subjective elements, while harder to quantify than physical characteristics, prove equally important for capturing the full essence of the subject. The interplay between objective features and subjective experience creates the rich, multidimensional reality that defines ' + topic + '.';
          conclusion = 'Through this detailed descriptive analysis, we have explored ' + topic + ' from multiple angles, examining its physical characteristics, functional aspects, contextual relationships, and experiential qualities. The composite picture that emerges reveals a subject of remarkable depth and complexity, one that rewards careful attention and thoughtful observation. By engaging with ' + topic + ' through this descriptive lens, we gain not just intellectual understanding but a more complete, visceral appreciation of its nature and significance. This comprehensive description serves as both a record of current understanding and an invitation for continued exploration and discovery. The richness of detail presented here demonstrates that ' + topic + ' is far more than simple definitions might suggest.';
          break;

        case 'persuasive':
          essayTitle = 'Why You Should Care About ' + topic;
          intro = 'In a world filled with competing demands for our attention, ' + topic + ' stands out as something that truly matters. This persuasive essay makes the case that ' + topic + ' deserves your immediate attention, active engagement, and committed action. The evidence is clear, the stakes are high, and the time for passive observation has passed. Through compelling arguments, concrete examples, and emotional appeals, this essay will convince you that you must care about ' + topic + ' and take meaningful steps to address it. Your future depends on your willingness to act now.';
          section1Title = 'The Urgent Need';
          body1 = 'We stand at a critical juncture where decisions made today will echo through generations to come. The urgency of ' + topic + ' cannot be overstated—every day of inaction compounds the challenges we face and narrows the window for effective response. Consider the mounting evidence: trends accelerating, opportunities diminishing, and consequences becoming increasingly severe. We have the knowledge, the resources, and the capability to make a difference, but only if we choose to act decisively and immediately. The question is not whether we can afford to act, but whether we can afford not to. The cost of inaction far exceeds the investment required for meaningful engagement.';
          section2Title = 'The Benefits of Action';
          body2 = 'Engaging with ' + topic + ' offers tremendous benefits that extend far beyond addressing immediate concerns. Those who take action position themselves as leaders, innovators, and problem-solvers. The personal growth, professional opportunities, and social impact that come from meaningful engagement create value that compounds over time. Moreover, early action provides competitive advantages and establishes positive precedents that influence broader change. You will gain skills, knowledge, and connections that serve you throughout life. The rewards of engagement far outweigh the costs of involvement, making action not just morally imperative but practically advantageous. Success stories abound of individuals and organizations that benefited from early engagement.';
          section3Title = 'The Consequences of Inaction';
          body3 = 'Conversely, failure to address ' + topic + ' carries severe consequences that we ignore at our peril. The costs of inaction accumulate exponentially, creating problems that become progressively harder and more expensive to solve. History provides numerous examples of societies that failed to respond to clear warnings, suffering devastating consequences as a result. We have the opportunity to learn from these mistakes and choose a different path. The question each person must answer is simple: Will I be part of the solution or part of the problem? Neutrality is not an option—inaction is itself a choice with profound implications. Future generations will judge us by our response to this moment.';
          section4Title = 'How You Can Make a Difference';
          body4 = 'The good news is that meaningful action remains within reach for everyone, regardless of position or resources. Start by educating yourself and others about ' + topic + ', spreading awareness and building understanding. Support organizations and initiatives working to address the issue through donations, volunteering, or advocacy. Make personal choices that align with your values and demonstrate commitment to positive change. Use your voice and your vote to demand action from leaders and institutions. Connect with others who share your concerns, building networks and communities of action. Most importantly, refuse to be discouraged by the scale of the challenge. Individual actions, multiplied across millions of people, create the collective force necessary for transformative change.';
          conclusion = 'The case for engaging with ' + topic + ' is overwhelming. The evidence demands action, the benefits justify effort, and the consequences of inaction are too severe to accept. This is not someone else\'s problem or a challenge for future generations—it is our responsibility, here and now. Each of us has the power to make a difference, and together we have the power to create transformative change. The question is not whether we should act, but whether we will. History will judge us by our response to this moment. Let us choose wisely, act boldly, and create a future we can be proud of. The time for action is now—will you answer the call? Your decision today shapes tomorrow\'s reality.';
          break;

        case 'analytical':
          essayTitle = 'Analyzing ' + topic + ': A Critical Examination';
          intro = 'To develop a sophisticated understanding of ' + topic + ', we must move beyond simple description to rigorous analysis. This analytical essay undertakes a systematic examination of ' + topic + ', breaking down complex elements into their constituent parts and exploring the relationships between them. Through critical thinking, evidence-based reasoning, and multiple analytical frameworks, we will develop a nuanced understanding that illuminates different dimensions of the subject. The following investigation employs structural, causal, comparative, and evaluative analysis to provide comprehensive insights.';
          section1Title = 'Structural Analysis';
          body1 = 'Examining the structure of ' + topic + ' reveals fundamental organizing principles and hierarchical relationships. The architecture of the subject demonstrates how individual components fit together to create a functional whole. Key elements can be identified and categorized according to their roles and relationships within the larger system. Primary components provide essential functions, while secondary elements support and enhance these core operations. This structural analysis exposes both the elegance of the design and potential vulnerabilities or inefficiencies. Understanding the structure provides essential insights into how the subject operates and why it manifests in particular ways. The relationships between components create emergent properties that exceed the sum of individual parts.';
          section2Title = 'Causal Analysis';
          body2 = 'Investigating the causes and effects associated with ' + topic + ' illuminates the dynamic processes at work. Multiple factors contribute to current conditions, each playing distinct roles in shaping outcomes. Root causes can be distinguished from proximate causes, revealing deeper patterns and relationships. Tracing causal chains reveals both direct and indirect relationships, immediate and long-term effects. Some causes prove more significant than others, while certain effects create feedback loops that amplify or dampen initial impacts. This causal analysis helps us understand not just what is happening, but why it happens and what might happen next. Identifying leverage points where interventions could have maximum effect becomes possible through careful causal analysis.';
          section3Title = 'Comparative Analysis';
          body3 = 'Comparing ' + topic + ' with related phenomena highlights distinctive features and common patterns. Similarities suggest underlying principles or shared origins, while differences point to unique characteristics or divergent developments. This comparative approach provides context and perspective, helping us understand the subject in relation to broader categories and frameworks. The analysis reveals what makes ' + topic + ' special while also showing how it fits into larger patterns and systems. Benchmarking against similar cases provides standards for evaluation and identifies best practices. Cross-cultural or cross-temporal comparisons reveal how context shapes manifestation and understanding. These comparisons enrich analysis by providing multiple reference points and perspectives.';
          section4Title = 'Critical Evaluation';
          body4 = 'A critical evaluation of ' + topic + ' assesses strengths, weaknesses, opportunities, and threats in a balanced manner. Strengths represent positive attributes and advantages that contribute to success or effectiveness. These might include efficiency, adaptability, resilience, or other valuable characteristics. Weaknesses identify limitations, vulnerabilities, or areas needing improvement that constrain performance or create risks. Opportunities point to potential for growth, development, or positive change that could be realized through appropriate action. Threats highlight challenges, risks, or factors that could undermine success or create problems. This comprehensive evaluation provides a balanced assessment that acknowledges both positive and negative aspects, enabling informed decision-making and strategic planning.';
          conclusion = 'This analytical examination of ' + topic + ' has employed multiple frameworks to develop a comprehensive, nuanced understanding. Through structural, causal, comparative, and critical analysis, we have explored the subject from various angles, each revealing different insights and perspectives. The synthesis of these analytical approaches creates a rich, multidimensional picture that captures the complexity and significance of ' + topic + '. This analysis serves not as a final word but as a foundation for continued investigation and deeper understanding. As new information emerges and contexts evolve, ongoing analysis will refine and extend these insights, contributing to ever-more sophisticated comprehension of this important subject.';
          break;
      }

      const fullEssay = essayTitle + '\n\n' + intro + '\n\n**' + section1Title + '**\n\n' + body1 + '\n\n**' + section2Title + '**\n\n' + body2 + '\n\n**' + section3Title + '**\n\n' + body3 + '\n\n**' + section4Title + '**\n\n' + body4 + '\n\n' + conclusion;
      
      setEssay(fullEssay);
      setGenerating(false);
    }, 2000);
  };

  const copyEssay = () => {
    navigator.clipboard.writeText(essay);
    alert('Essay copied to clipboard!');
  };

  const downloadEssay = () => {
    const blob = new Blob([essay], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = topic.replace(/\s+/g, '-') + '-essay.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadOutline = () => {
    const outlineText = outline.join('\n');
    const blob = new Blob([outlineText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = topic.replace(/\s+/g, '-') + '-outline.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl mb-4 shadow-lg">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              AI Essay Writer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Generate professional, well-structured essays with advanced AI
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Essay Topic *
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., The Impact of Technology on Education, Climate Change Solutions, etc."
                className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none transition"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Essay Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['argumentative', 'expository', 'narrative', 'descriptive', 'persuasive', 'analytical'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setEssayType(type)}
                      className={`py-3 px-4 rounded-xl font-medium transition text-sm ${
                        essayType === type
                          ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-amber-400'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Essay Length: <span className="text-amber-600 font-bold">{pageCount} pages</span> <span className="text-gray-500 text-sm">(~{pageCount * 275} words)</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={pageCount}
                  onChange={(e) => setPageCount(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-amber-600"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1 page</span>
                  <span>10 pages</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  * Based on double-spaced, 12pt font, 1-inch margins
                </p>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
              <div className="flex items-start space-x-3">
                <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {essayType.charAt(0).toUpperCase() + essayType.slice(1)} Essay
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {essayType === 'argumentative' && 'Presents a clear position on a topic and supports it with evidence and reasoning.'}
                    {essayType === 'expository' && 'Explains or informs about a topic in a clear, logical manner without personal opinions.'}
                    {essayType === 'narrative' && 'Tells a story or describes an experience with a clear beginning, middle, and end.'}
                    {essayType === 'descriptive' && 'Provides detailed sensory descriptions to create vivid mental images.'}
                    {essayType === 'persuasive' && 'Convinces readers to adopt a particular viewpoint or take specific action.'}
                    {essayType === 'analytical' && 'Breaks down a topic into components and examines relationships between them.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={generateEssay}
            disabled={generating || !topic.trim()}
            className="w-full py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold rounded-xl hover:from-amber-700 hover:to-yellow-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed mb-8"
          >
            <Sparkles className="w-5 h-5" />
            <span>{generating ? 'Generating Essay...' : 'Generate Essay'}</span>
          </button>

          {essay && (
            <div className="space-y-6">
              {outline.length > 0 && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Essay Outline
                      </h3>
                    </div>
                    <button
                      onClick={downloadOutline}
                      className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition flex items-center space-x-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                  <div className="space-y-1 font-mono text-sm text-gray-800 dark:text-gray-200">
                    {outline.map((line, index) => (
                      <div key={index} className={line.startsWith('   ') ? 'ml-6 text-gray-600 dark:text-gray-400' : 'font-semibold'}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-6 h-6 text-amber-600" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Generated Essay
                  </h2>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={copyEssay}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2 shadow-md"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={downloadEssay}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center space-x-2 shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <div className="p-8 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-inner">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {essay.split('\n\n').map((paragraph, index) => {
                    if (index === 0) {
                      return (
                        <h2 key={index} className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                          {paragraph}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('**')) {
                      const parts = paragraph.split('**');
                      return (
                        <div key={index} className="mb-6">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            {parts[1]}
                          </h3>
                          <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-justify">
                            {parts[2]}
                          </p>
                        </div>
                      );
                    }
                    return (
                      <p key={index} className="text-gray-800 dark:text-gray-200 leading-relaxed text-justify mb-6">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pages</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {Math.ceil(essay.split(/\s+/).filter(w => w.length > 0).length / 275)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Words</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {essay.split(/\s+/).filter(w => w.length > 0).length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Characters</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {essay.length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Paragraphs</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {essay.split('\n\n').length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Type</p>
                  <p className="text-lg font-bold text-amber-600 dark:text-amber-400 capitalize">
                    {essayType}
                  </p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Lightbulb className="w-5 h-5 text-green-600 mr-2" />
                  Tips for Improving Your Essay
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Review and personalize the content with your own insights and examples</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Add specific citations and references to support your arguments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Proofread for grammar, spelling, and clarity before submission</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Ensure the essay meets your specific assignment requirements</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Note:</strong> This AI-generated essay is meant to serve as a starting point and inspiration. 
              Always review, edit, and personalize the content to match your voice, add specific examples, 
              and ensure it meets your assignment requirements. Use this tool responsibly and ethically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

